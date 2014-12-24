/* A logical combo of Techniques and the intersection of their outcomes. */
quail.lib.wcag2 = (function () {
  'use strict';
  var ajaxOpt = {async: false, dataType: 'json'};

  /**
   * Run Quail using WCAG 2
   *
   * Options can be used either to tell Quail where to load the wcag2 structure file
   * or to give it directly (if it's already loaded). For the first, jsonPath
   * must be provided. For the second the wcag2.json data must be given to 
   * options.wcag2Structure and the tests data to options.accessibilityTests.
   * 
   * @param  {[object]} options Quail options
   */
  function runWCAG20Quail(options) {
    if (options.wcag2Structure && options.accessibilityTests && options.preconditionTests) {
      startWCAG20Quail(
          options,
          options.wcag2Structure,
          options.accessibilityTests,
          options.preconditionTests);

    } else {
      // Load the required json files
      $.when(
        $.ajax(options.jsonPath + '/wcag2.json', ajaxOpt),
        $.ajax(options.jsonPath + '/tests.json', ajaxOpt),
        $.ajax(options.jsonPath + '/preconditions.json', ajaxOpt))

      // Setup quail given the tests described in the json files
      .done(function (wcag2Call, testsCall, preconditionCall) {
        startWCAG20Quail(options, wcag2Call[0], testsCall[0], preconditionCall[0]);
      });

    }
  }

  function startWCAG20Quail(options, wcag2Call, tests, preconditionTests) {
    var criteria, accessibilityTests, knownTests;
    var allTests = [];

    criteria = $.map(wcag2Call, function (critData) {
      return new quail.lib.wcag2.Criterion(
        critData, tests, preconditionTests, options.subject);
    });

    // Create the accessibiliyTests object, based on the
    // tests in the criteria
    $.each(criteria, function (i, criterion) {
      allTests.push.apply(allTests, criterion.getTests());
    });

    knownTests = [];
    accessibilityTests = [];

    // Remove duplicates
    // TODO: Figure out why some tests are created multiple times
    $.each(allTests, function (i, test) {
      if (knownTests.indexOf(test.title.en) === -1) {
        knownTests.push(test.title.en);
        accessibilityTests.push(test);
      }
    });

    // Run quail with the tests instead of the guideline
    $(quail.html).quail({
      accessibilityTests: accessibilityTests,
      // Have wcag2 intercept the callback
      testCollectionComplete: createCallback(
          criteria, options.testCollectionComplete)
    });
  }


  function createCallback(criteria, callback) {
    return function (status, data) {
      if (status === 'complete') {
        data = $.map(criteria, function (criterion) {
          return criterion.getResult(data);
        });
      }

      callback(status, data);
    };
  }

  return {
    run: runWCAG20Quail
  };

}());