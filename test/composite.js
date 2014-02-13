/*! QUAIL quail-lib.org | quail-lib.org/license */

var accessibilityTests = { };

$.ajax({ url : '../../../dist/tests.json',
 async : false,
 dataType : 'json',
 cache : false,
 success : function(data) {
    if(typeof data === 'object') {
      accessibilityTests = data;
    }
}});


var quailTest = {

  results : { },

  testName : '',

  runTest : function(testName, testFailed, complete) {
    quailTest.testName = testName;
    var $target = ($('#quail-scope').length) ? $('#quail-scope') : $(document);
    var testFails = (typeof testFails !== 'undefined') ? testFails : function() {};
    $target.quail({
      jsonPath : '../../../src/resources',
      guideline : [ testName ],
      reset : true,
      accessibilityTests : accessibilityTests,
      testFailed: testFailed,
      complete : function(results) {
        $.each(results.results[testName].elements, function(index, item) {
          if(typeof item === 'undefined' ||
             (item && item.attr('id') && item.attr('id').indexOf('qunit-') !== -1) ||
             item.parents('#qunit-wrapper').length) {
            results.results[testName].elements.splice(index, 1);
          }
        });
        quailTest.results = results.results;
        if(typeof complete !== 'undefined') {
          complete(results);
        }
      }
    });
  },

  /**
   * Compares the status of the test result to the resultType argument.
   *
   * @param string resultType
   *   Possible values include: 'inapplicable', 'failed', 'passed', 'cantTell',
   *   and 'untested'
   * @return boolean
   */
  confirmStatus: function (resultType) {
    return quailTest.results[quailTest.testName].status === 'passed';
  },

  confirmIsEmpty : function() {
    $.each(quailTest.results[quailTest.testName].elements, function(index, item) {
      if(typeof item === 'undefined' ||
         (item && item.attr('id') && item.attr('id').indexOf('qunit-') !== -1) ||
         item.parents('#qunit-wrapper').length) {
        quailTest.results[quailTest.testName].elements.splice(index, 1);
      }
    });
    if(quailTest.results[quailTest.testName].elements.length) {
      return false;
    }
    return true;
  },

  confirmIsTag : function(tag) {
    if(typeof quailTest.results[quailTest.testName].elements[0] === 'undefined') {
      return false;
    }
    return quailTest.results[quailTest.testName].elements[0].is(tag);
  },

  insertElements : function(callback) {
   $('body').append('<div role="header" id="qunit-wrapper"><h2 id="qunit-banner"></h2><div id="qunit-testrunner-toolbar"></div><h2 id="qunit-userAgent"></h2><ol id="qunit-tests"></ol><div id="qunit-fixture">test markup, will be hidden</div></div>');
  }
};

$(document).ready(quailTest.insertElements);
