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
      $('head').append('<link rel="stylesheet" href="../../lib/qunit/qunit.css" media="screen">');
      $('head').append('<link rel="stylesheet" href="../test.css" media="screen">');
      $('body').prepend('<div role="status" id="qunit"></div><div role="status" id="qunit-fixture"></div>');
      this.tests = quail.lib.TestCollection(__quailTests);
      var eventObject = document.createEvent('MouseEvents');
      eventObject.initEvent('testsReady', true, true );
      document.dispatchEvent(eventObject);
      if (typeof global.quailTest !== 'undefined') {
        global.quailTest();
      }
      else {
        this.runTests();
      }
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
        if ($(this).hasClass('limit-chrome') && navigator.userAgent.search('Chrome') === -1) {
          test('Skipping', function() {
            ok(true, 'Skipping test because browser is not chrome.');
          });
          return;
        }
        if ($(this).hasClass('limit-phantom') && navigator.userAgent.search('PhantomJS') === -1) {
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
        var testDefinition = that.tests.find(testName);
        testTitle = !testTitle && testDefinition && (testDefinition.get('title')) ? testDefinition.get('title').en : 'No test title defined';

        // Set the test scope. Add to the scope, don't replace it. On the first
        // iteration of this loop, use an empty jQuery object as the first
        // scope. A Test will return the document as its default scope and in
        // the context of tests, we don't want this default.
        var $scope;
        if (index === 0) {
          $scope = $();
        }
        else {
          $scope = testDefinition.get('$scope');
        }
        // Sometimes the scope is overridden.
        var dataScope = $(this).data('scope');
        if (dataScope) {
          if (dataScope === 'document') {
            $scope = $scope.add(document);
          }
          else {
            $scope = $scope.add(dataScope);
          }
        }
        else {
          $scope = $scope.add(this);
        }
        testDefinition.set('scope', $scope.get());

        // @todo, this is legacy stuff; remove eventually.
        testDefinition.set('index', index);

        // Track the test as one to evaluate.
        // TestCollection.prototype.add is idempotent.
        testsToEvaluate.add(testDefinition);
        testDefinition.registerListener('timeout', function (e, test, tc) {
          console.log(e);
        });

      });

      // Run the TestCollection Tests.
      testsToEvaluate.run({
        preFilter: function (testName, element) {
          var $element = $(element);
          if ($element.is('#qunit') || $element.parents('#qunit').length) {
            return false;
          }
        },
        caseResolve: this.quailComplete
      });
    },

    /**
     * Callback for when quail is done running tests.
     */
    quailComplete: function(eventName, thisTest, _case) {
      // Only run a test if there is an expected outcome.
      if (_case.get('expected')) {
        var title = thisTest.get('title') && thisTest.get('title').en || 'No title for test';
        test(title, function() {
          var expected = _case.get('expected');
          var label = expected || 'no label';
          // Label the individual test case.
          $(_case.get('element')).addClass(label);

          var message = _case.get('message') || 'Expected status: ' + expected;
          // Process the results.
          switch (expected) {
          case 'pass':
            ok(_case.get('status') === 'passed', message);
            break;
          case 'fail':
            ok(_case.get('status') === 'failed', message);
            break;
          case 'cantTell':
            ok(_case.get('status') === 'cantTell', message);
            break;
          case 'inapplicable':
            ok(_case.get('status') === 'inapplicable', message);
            break;
          }
        });
      }
    }
  };

  testRunner.run();

})(this);
