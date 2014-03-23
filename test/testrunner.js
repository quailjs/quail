/**
 * The test runner will take a properly-formatted page and
 * run accessibility tests against it. To learn more about how to use
 * the test runner, read the wiki at:
 * https://github.com/kevee/quail/wiki/Writing-unit-tests-and-testing-accessibility-tests
 */


(function(global) {

  var testRunner = {

    /**
     * Accessibility tests loaded from ../dist/tests.json
     */
    accessibilityTests : {},

    /**
     * An object to store QUnit callbacks while we scaffold a test for composite.
     */
    qunitCallbacks : {},

    /**
     * Run qunit tests against the page. We first capture any
     * test callbacks into our own object so we can call them later.
     * This is necessary to keep composite tests with long page
     * times working.
     */
    run: function() {
      var that = this;
      if(typeof QUnit === 'undefined') {
        global.QUnit = {
          moduleStart: function(callback) {
            that.qunitCallbacks.moduleStart = callback;
          },
          testStart: function(callback) {
            that.qunitCallbacks.testStart = callback;
          },
          testDone: function(callback) {
            that.qunitCallbacks.testDone = callback;
          },
          log: function(callback) {
            that.qunitCallbacks.log = callback;
          },
          done: function(callback) {
            that.qunitCallbacks.done = callback;
          }
        };
      }
      this.includejQuery();
    },

    /**
     * Include jQuery on the page using vanilla JS, including differences
     * in script ready events.
     */
    includejQuery: function() {
      var em = document.createElement('script');
      em.type = 'text/javascript';
      if (em.readyState) {
        em.onreadystatechange = function () {
          if (em.readyState == "loaded" || em.readyState == "complete") {
            em.onreadystatechange = null;
            testRunner.includeScripts();
          }
        };
      } else {
        em.onload = function () {
          testRunner.includeScripts();
        };
      }
      em.src = '../../lib/jquery/jquery.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(em, s);
    },

    /**
     * Once jQuery is available, insert Qunit styles, the placeholder for
     * the Qunit fixture, and load the rest of the needed JS on the page.
     * At the end, we request tests.json and set a 250ms timeout to prevent
     * the parent composite tester from timing out.
     *
     * If the page has defined a global.quailTest function, we then run it, if
     * not, we run the runTests method.
     */
    includeScripts: function() {
      var that = this;
      $('head').append('<link rel="stylesheet" href="../../lib/qunit/qunit.css" media="screen">');
      $('head').append('<link rel="stylesheet" href="../test.css" media="screen">');
      $('body').prepend('<div role="status" id="qunit"></div><div role="status" id="qunit-fixture"></div>');
      $.getScript('../quail-testing.jquery.js', function() {
        $.getScript('../../lib/qunit/qunit.js', function() {
          $.ajax({
            url: '../../dist/tests.json',
            dataType: 'json',
            success: function(data) {
              that.tests = quail.lib.TestCollection(data);
              that.buildQUnit();
              QUnit.init();
              setTimeout(function() {
                start();
                var eventObject = document.createEvent('MouseEvents');
                eventObject.initEvent('testsReady', true, true );
                document.dispatchEvent(eventObject);
                if(typeof global.quailTest !== 'undefined') {
                  global.quailTest();
                }
                else {
                  that.runTests();
                }
              }, 250);
            }
          });
        });
      });
    },

    /**
     * Assign callbacks for QUnit after the timeout has completed.
     */
    buildQUnit: function() {
      if(typeof this.qunitCallbacks.moduleStart === 'undefined') {
        return;
      }
      QUnit.moduleStart = this.qunitCallbacks.moduleStart;
      QUnit.testStart = this.qunitCallbacks.testStart;
      QUnit.testDone = this.qunitCallbacks.testDone;
      QUnit.log = this.qunitCallbacks.log;
      QUnit.done = this.qunitCallbacks.done;
    },

    /**
     * For accessibility tests, we can (for most tests) just use markup on the page
     * to determine what test to run, where to run it, and whether to expect a failure.
     * This runs quail against all .quail-test elements, determines pass/fail, and
     * then runs comparisons into QUnit assertions.
     */
    runTests: function () {
      var that = this;
      var testsToEvaluate = quail.lib.TestCollection();
      $('.quail-test').each(function(index) {
        if($(this).hasClass('limit-chrome') && navigator.userAgent.search('Chrome') === -1) {
          test('Skipping', function() {
            ok(true, 'Skipping test because browser is not chrome.');
          });
          return;
        }
        if($(this).hasClass('limit-phantom') && navigator.userAgent.search('PhantomJS') === -1) {
          test('Skipping', function() {
            ok(true, 'Skipping test because browser is not phantom.');
          });
          return;
        }
        // The testing environment is legitimate. Assemble the test details.
        var testName = $(this).data('accessibility-test');
        if (!testName) {
          test('Accessibility test is defined', function () {
            ok(false, 'Accessibility test is not defined.');
          });
        }
        var testTitle = $(this).attr('title');
        var testDefinition = that.tests.find('testName');
        testTitle = !testTitle && testDefinition && (testDefinition.title) ? testDefinition.title.en : 'No test title defined';

        // Creat a Test object.
        testsToEvaluate.add(quail.lib.Test(testName, {
          title : testTitle,
          el: this,
          expectedPass: ($(this).data('expected') === 'pass'),
          index: index
        }));
      });

      // Run the TestCollection Tests.
      testsToEvaluate.run({
        preFilter: function (testName, element) {
          var $element = $(element);
          if($element.is('#qunit') || $element.parents('#qunit').length) {
            return false;
          }
        },
        complete: function (event, test) {
          that.quailComplete(event, test.get('index'), test.get('title'), test, test.get('el'));
        }
      });
    },

    /**
     * Callback for when quail is done running tests.
     */
    quailComplete: function(event, index, testTitle, thisTest, $target) {
      test(testTitle +  thisTest.title, function() {
        label = (thisTest.expectedPass) ? 'pass' : 'fail';
        $target.addClass(label)
             .prepend('<span class="test-label">#' + (index + 1) + ' (' + label + ')</span>');
        if(thisTest.expectedPass) {
          ok(event.results[thisTest.accessibilityTest].elements.length === 0, 'No elements failed test');
        }
        else {
          if($target.hasClass('self-fail')) {
            ok(event.results[thisTest.accessibilityTest].elements.length > 0, 'Self testing element failed (document-wide test)');
          }
          else {
            $target.find('.quail-failed-element').each(function() {
              var found = this;
              expected = false;
              $.each(event.results[thisTest.accessibilityTest].elements, function(index, $element) {
                if($element.get(0) === found ||
                   $element.is('body') && $target.find('body').hasClass('quail-failed-element')) {
                  expected = true;
                  $(found).addClass('found');
                }
                if($element.is('svg')) {
                  if($element.attr('class') === 'quail-failed-element') {
                    $element.attr('class', 'quail-failed-element found');
                    expected = true;
                  }
                }
              });
              if(!expected) {
                ok(false, 'Element not found:' + $('<div>').append($(found).clone().empty()).html());
              }
            });
            ok($target.find('.quail-failed-element').length === $target.find('.quail-failed-element.found').length, $target.find('.quail-failed-element').length + ' element(s) failed');
          }
        }
      });
    }
  };

  testRunner.run();

})(this);
