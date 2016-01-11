// Context is phantom

var system = require('system');
var webpage = require('webpage');
var fs = require('fs');
var address = system.args[1];
var dir = system.args[2];
var configFilePath = system.args[3]; // Configuration JSON file.
var outputDir = system.args[4]; // Directory to write output to.

// Run time configurations.
var config = JSON.parse(fs.read(configFilePath));

// Create the QtRuntimeObject with the desired configuration. This is the PhantomJS
// controller object.
var page = webpage.create(config.phantomjs);

/**
 * Logs the reason for exit; exits Phantom.
 */
function quitPhantom (reason) {
  console.log('Exit' + (reason && (': ' + reason) || ''));
  phantom.exit();
}

/**
 * Determines the length of an object.
 *
 * @param object obj
 *   The object whose size will be determined.
 *
 * @return number
 *   The size of the object determined by the number of keys.
 */
function size (obj) {
  var s = 0;
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      s++;
    }
  }
  return s;
}
/**
 * Escapes strings to pass to RegExp.
 *
 * @see http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
 */
function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

page.onConsoleMessage = function (msg) {
  console.log(msg);
};

// Catch script evaluation errors; quit Phantom.
page.onError = function (msg, trace) {
  console.log(JSON.stringify([
    'Error on the evaluated page',
    msg,
    trace
  ], undefined, 2));
  quitPhantom('Error on the evaluated page');
};

// Blocking resource requests by domain or type.
var blacklists = config.blacklists || {};

function rMapper (str) {
  var r = escapeRegExp(str);
  return new RegExp(r, 'i');
}

var rBlockedDomains = (blacklists.domains || []).map(rMapper);
var rBlockedTypes = (blacklists.mimetypes || []).map(rMapper);
var rBlockedHeaders = (blacklists.headers || []).map(rMapper);

page.onResourceRequested = function (requestData, request) {
  var blocked = false;
  var reason = '';
  // Block third-party resource requests from blacklisted domains.
  blocked = rBlockedDomains.some(function (reg) {
    return reg.test(requestData.url);
  });
  // Block third-party resource requests of specific Accept types.
  if (blocked) {
    reason = 'domain';
  }
  else {
    blocked = rBlockedTypes.some(function (reg) {
      // Get the Accept header value.
      var accept;
      (requestData.headers || []).forEach(function (header) {
        if (header.name.toLowerCase() === 'accept') {
          accept = header.value;
        }
      });
      return reg.test(accept || '');
    });
    if (blocked) {
      reason = 'type';
    }
  }
  // Block third-party resource requests by Header.
  if (!blocked) {
    blocked = rBlockedHeaders.some(function (reg) {
      return (requestData.headers || []).some(function (header) {
        return reg.test(header.name);
      });
    });
    if (blocked) {
      reason = 'header';
    }
  }

  if (blocked) {
    console.log(JSON.stringify([
      'BLOCKED (' + reason + ')',
      'Requested (' + requestData.method + ')',
      requestData.url
    ]));
    request.abort();
  }
};

page.onResourceTimeout = function (error) {
  console.log(JSON.stringify([
    'Resource timeout',
    error.errorCode, // it'll probably be 408
    error.errorString, // it'll probably be 'Network timeout on resource'
    error.url // the url whose request timed out
  ]));
};

page.onResourceError = function (error) {
  // Ignore blocked resource errors.
  if (error.errorCode !== 301) {
    console.log(JSON.stringify([
      'Resource error',
      'Error code: ' + error.errorCode,
      error.errorString,
      error.url
    ], undefined, 2));
  }
};

// This is the last chance to catch catestrophic errors.
phantom.onError = function (msg, trace) {
  console.log(JSON.stringify([
    'Error in the phantom runner',
    msg,
    trace
  ], undefined, 2));
};

var distPath = dir + '/dist'; // ./dist

// var guidelinedata = fs.read(distPath + '/guideline.json');
var guidelines = {}; // JSON.parse(guidelinedata);

var testsdata = fs.read(distPath + '/tests.json');
// Save the testsdata in the array all tests.
// Some tests might need to be filtered out.
var allTests = JSON.parse(testsdata);
var tests = {};

// If a specific test is requested, just use that one.
var testFromCLI = system.args[2];

if (testFromCLI && allTests[testFromCLI]) {
  var singleTest = allTests[testFromCLI];
  tests = {};
  tests[testFromCLI] = singleTest;
}
else if (guidelines.length) {
  // Only add the tests which are defined in the guidelines.
  for (var i = 0 ; i < guidelines.length; i++) {
    var key = guidelines[i];
    if (allTests[key]) {
      tests[key] = allTests[key];
    }
  }
}
else {
  tests = allTests;
}

// The number of items that will attempt to write data from the evaluation.
// When the evaulation starts, it will register how many items will
// report back.
var len = null;
// Open a write stream to an output file.
var date = new Date();
var timestamp = [
  date.getFullYear(),
  ('0' + (date.getMonth() + 1)).slice(-2),
  ('0' + date.getDate()).slice(-2),
  '-',
  ('0' + date.getHours()).slice(-2),
  ('0' + date.getMinutes()).slice(-2),
  ('0' + date.getSeconds()).slice(-2),
  '-',
  date.getTime()
].join('');
// Write out the results is an output directory path was provided.
var resultsFile;
if (outputDir) {
  resultsFile = [outputDir, timestamp + '-analysis.js'].join('/');
}
else {
  resultsFile = dir + '/analyses/' + timestamp + '-analysis.js';
}
var stream = fs.open(resultsFile, 'w');

// The data to be written to file.
var output = {};
var start = (new Date()).getTime();
// The callback function reachable from the page.evaluate* methods.
page.onCallback = function (action, data) {
  var name;
  switch (action) {
  // Len is the number of times we expect to log data.
  case 'setCounter':
    len = data;
    break;
  case 'writeData':
    if (len !== null) {
      --len;
    }

    // Store all the keys in the object to an output object.
    data = JSON.parse(data);
    if (typeof data === 'object') {
      for (var key in data) {
        // Tests and Success Criteria are situated under their own keys.
        if (key === 'tests' || key === 'successCriteria') {
          if (!output[key]) {
            output[key] = {};
          }
          for (name in data[key]) {
            if (data[key].hasOwnProperty(name)) {
              output[key][name] = data[key][name];
            }
          }
        }
        else {
          output[key] = data[key];
        }
      }
    }
    // All the tests have completed.
    if (len === 0 || len === null) {
      console.log('Elapsed time: ' + ((new Date()).getTime() - start) / 1000 + ' seconds');
      console.log('Cases found: ' + (output.stats && output.stats.cases || 0));

      // Time for each test.
      // console.log('Elapsed time for tests:');
      for (name in output.tests) {
        if (output.tests.hasOwnProperty(name)) {
          // console.log('elapsed time:\t' + output.tests[name].elapsedTime + '\t' + name);
        }
      }
      console.log('Results were written to ' + resultsFile);
      stream.write(JSON.stringify(output, null, '\t'));
      stream.close();

      quitPhantom('Testing complete');
    }
    break;
  case 'quit':
    quitPhantom(data);
    break;
  default:
    break;
  }
};

page.open(address);

// Decorate the page once the HTML has been loaded.
// This is where we run the tests.
page.onLoadFinished = function (status) {
  var callPhantom = window && window.callPhantom || function () {};
  if (status === 'success') {
    console.log('Page opened successfully: ' + address);
    // page.injectJs(distPath + '/quail.jquery.js');
    page.injectJs(distPath + '/bundle.js');

    // Run the evaluation.
    //
    // The evaluation is executed in its own function scope. Closures that
    // incorporate outside scopes are not possible.
    try {
      page.evaluate(function (tests) {
        // Tell the client that we're starting the test run.
        console.log('Beginning evaluation.');

        // Basic output structure attributes.
        var output = {
          tests: {},
          successCriteria: {},
          stats: {
            tests: 0,
            cases: 0
          }
        };
        globalQuail.run({
          assessments: tests,
          // Called when an individual Case in a test is resolved.
          caseResolve: function (eventName, test, _case) {
            var name = test.get('name');

            if (!output.tests[name]) {
              output.tests[name] = {
                id: name,
                title: test.get('title'),
                description: test.get('description'),
                type: test.get('type'),
                testability: test.get('testability'),
                guidelines: test.get('guidelines') || {},
                tags: test.get('tags'),
                cases: []
              };
            }
            // Push the case into the results for this test.
            output.tests[name].cases.push({
              status: _case.get('status'),
              selector: _case.get('selector'),
              html: _case.get('html')
            });
            // Increment the cases count.
            output.stats.cases++;
          },
          // Called when all the Cases in a Test are resolved.
          testComplete: function (event, test) {
            var name = test.get('name');
            // Increment the tests count.
            output.stats.tests++;
            // Record the elapsed time for the test.
            if (output.tests[name]) {
              output.tests[name].elapsedTime = test.get('endTime') - test.get('startTime');
            }
          },
          // Called when all the Tests in a TestCollection are completed.
          testCollectionComplete: function () {
            // Push the results of the test out to the Phantom listener.
            console.log('The test collection has been evaluated.');
            callPhantom('writeData', JSON.stringify(output));
          },
          successCriteriaEvaluated: function (eventName, successCriteria) {
            var name = successCriteria.get('name');
            var status = successCriteria.get('status');
            // var totals = successCriteria.get('totals');
            var output = {
              successCriteria: {}
            };
            // Get some stringifyable data from the results.
            var looper = function (index, _case) {
              output.successCriteria[name][result].push({
                selector: _case.get('selector'),
                html: _case.get('html')
              });
            };

            // Push the results of the test out to the Phantom listener.
            // If the SC was untested, report that as its status.
            if (status === 'untested' || status === 'noResults' || status === 'noTestCoverage') {
              output.successCriteria[name] = status;
            }
            // Otherwise get the cases and report them under their status.
            else {
              output.successCriteria[name] = {};
              var results = successCriteria.get('results');
              for (var result in results) {
                if (results.hasOwnProperty(result)) {
                  output.successCriteria[name][result] = [];
                  // Go through each case for this result and get its selector and HTML.
                  results[result].forEach(looper);
                }
              }
              // List the totals for each type of result
              output.successCriteria[name].totals = successCriteria.get('totals');
            }
            // Echo
            // console.log('Evaluated: ' + name, 'conclusion: ' + status, 'totals: ' + JSON.stringify(totals));
            // Attempt to write out the data.
            callPhantom('writeData', JSON.stringify(output));
          }
        });
      }, tests, size);
    }
    catch (error) {
      callPhantom('quit', error);
    }
  }
  else {
    callPhantom('quit', 'Page failed to load');
  }
};
