quail.lib.wcag2.TestAggregator = (function () {

  var pointerMap = {
    elms: [],
    pointers: [],
    add: function (testCase) {
      var pointer;
      if (pointerMap.elms.indexOf(testCase.get('element')) === -1) {
        if (testCase.get('html')) {
          pointer = [{
            type: 'CharSnippetCompoundPointer',
            chars: testCase.get('html'),
            CSSSelector: testCase.get('selector')
          }];
        }
        pointerMap.elms.push(testCase.get('element'));
        pointerMap.pointers.push(pointer);
      }
    },
    getPointer: function (elm) {
      var index = pointerMap.elms.indexOf(elm);
      return pointerMap.pointers[index];
    }
  };

  /**
   * Run the callback for each testcase within the array of tests
   * @param  {array}   tests
   * @param  {Function} callback Given the parameters (test, testcase)
   */
  function eachTestCase(tests, callback) {
    $.each(tests, function (i, test) {
      test.each(function () {
        callback.call(this, test, this);
      });
    });
  }

  /**
   * Get an array of elements common to all tests provided
   * @param  {Object} tests
   * @return {Array}        Array of HTML elements
   */
  function getCommonElements(tests) {
    var common = [];
    var map = [];

    $.each(tests, function (i, test) {
      var elms = [];
      test.each(function () {
        elms.push(this.get('element'));
        pointerMap.add(this);
      });
      map.push(elms);
    });
    $.each(map, function (i, arr) {
      if (i === 0) {
        common = arr;
        return;
      }
      var newArr = [];
      $.each(arr, function (i, val) {
        if (common.indexOf(val) !== -1) {
          newArr.push(val);
        }
      });
      common = newArr;
    });

    return common;
  }

  /**
   * Get an array of elements in the given tests
   * @param  {Object} tests
   * @return {Array}        Array of HTML elements
   */
  function getAllElements(tests) {
    var elms = [];
    eachTestCase(tests, function (test, testCase) {
      var elm = testCase.get('element');
      if (elms.indexOf(elm) === -1) {
        elms.push(elm);
        pointerMap.add(testCase);
      }
    });
    return elms;
  }

  /**
   * Look at each unique element and create an assert for it
   * @param  {array[DOM element]} elms
   * @param  {object} base Base object for the assert
   * @return {array[assert]}      Array with asserts
   */
  function createAssertionsForEachElement(elms, base) {
    var assertions = [];
    // Create asserts for each element
    $.each(elms, function (i, elm) {
      var assertion = new quail.lib.wcag2.EarlAssertion(base);
      if (elm) { // Don't do undefined pointers
        assertion.outcome.pointer = pointerMap.getPointer(elm);
      }
      assertions.push(assertion);
    });
    return assertions;
  }

  /**
   * Combine the test results of an Aggregator into asserts
   *
   * A combinbing aggregator is an aggregator which only fails if all it's tests fail
   *
   * @param  {Object} aggregator
   * @param  {Array[Object]} tests
   * @return {Array[Object]}         Array of Asserts
   */
  function getCombinedAssertions(aggregator, tests) {
    // element should already be unique, but some tests have bugs that cause them
    // not to be. This prevents those problems from escalating
    var elms = jQuery.unique(getCommonElements(tests));

    var assertions = createAssertionsForEachElement(jQuery.unique(elms), {
      testCase: aggregator.id,
      outcome: {result: 'failed'}
    });

    // Iterate over all results to build the assert
    eachTestCase(tests, function (test, testCase) {
      // Look up the assert, if any
      var newResult = testCase.get('status');
      var getResultPriority = quail.lib.wcag2.EarlAssertion.getResultPriority;
      var assertion = assertions[elms.indexOf(
        testCase.get('element')
      )];

      // Allow the aggregator to override the results
      if (aggregator[newResult]) {
        newResult = aggregator[newResult];
      }

      // Override if the resultId is higher or equal (combine)
      if (assertion && getResultPriority(assertion) >= getResultPriority(newResult)) {
        var pointer = assertion.outcome.pointer;
        assertion.outcome = {
          result: newResult,
          info: test.get('title')
        };
        if (pointer) {
          assertion.outcome.pointer = pointer;
        }
      }
    });

    return assertions;
  }


  /**
   * Stack the test results of a aggregator into asserts
   *
   * A stacked aggregator is one that fails if any of the tests fail
   *
   * @param  {Object} aggregator
   * @param  {Array[Object]} tests
   * @return {Array[Object]}         Array of Asserts
   */
  function getStackedAssertions(aggregator, tests) {
    var elms = getAllElements(tests);
    var asserts = createAssertionsForEachElement(elms, {
      testCase: aggregator.id,
      outcome: { result: 'untested'}
    });

    // Iterate over all results to build the assert
    eachTestCase(tests, function (test, testCase) {
      // Look up the assert, if any
      var newResult = testCase.get('status');
      var getResultPriority = quail.lib.wcag2.EarlAssertion.getResultPriority;
      var assert = asserts[elms.indexOf(
        testCase.get('element')
      )];

      // Allow the aggregator to override the results
      if (aggregator[newResult]) {
        newResult = aggregator[newResult];
      }

      // Override if the resultId is lower (stacked)
      if (assert && getResultPriority(assert) < getResultPriority(newResult)) {
        assert.outcome = {
          result: newResult,
          info: test.get('title')
        };
      }
    });
    return asserts;
  }


  function TestAggregator(config, testDefinitions, subject) {
    $.extend(this, {
      id: config.tests.join('+'),
      subject: subject
    }, config);

    this.tests = $.map(this.tests, function (test) {
      return testDefinitions[test];
    });
  }


  /**
   * Filter the data array so it only contains results
   * from this aggregator
   * @param  {Array} data
   * @return {Array}
   */
  TestAggregator.prototype.filterDataToTests = function (data) {
    var names = $.map(this.tests, function (test) {
      return test.name;
    });
    var testData = [];

    $.each(data, function (i, result) {
      if (names.indexOf(result.get('name')) !== -1) {
        testData.push(result);
      }
    });
    return testData;
  };

  /**
   * Get the results of this test aggregator based on the tests provided for it
   * @param  {object} tests As provided by Quail
   * @return {object}       EARL assertions
   */
  TestAggregator.prototype.getResults = function (tests) {
    var assertions, assertion;
    var filteredTests = this.filterDataToTests(tests);

    if (filteredTests.length === 1 || this.type === 'combined') {
      assertions = getCombinedAssertions(this, filteredTests);

    } else if (this.type === "stacking") {
      assertions = getStackedAssertions(this, filteredTests);

    } else if (window) {
      window.console.error(
        "Unknown type for aggregator " + this.id
      );
    }

    // Return a default assert if none was defined
    if (assertions) {
      if (assertions.length === 0) {
        assertion = new quail.lib.wcag2.EarlAssertion({
          testCase: this.id,
          subject: this.subject,
          outcome: {
            result: 'inapplicable'
          }
        }),
        assertions.push(assertion);
      }
      return assertions;
    }
  };

  return TestAggregator;
}());