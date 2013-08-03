/*! QUAIL quail-lib.org | quail-lib.org/license */

var accessibilityTests = { };

$.ajax({ url : '../../../src/resources/tests.json',
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

  runTest : function(testName) {
    quailTest.testName = testName;
      var $target = ($('#quail-scope').length) ? $('#quail-scope') : $(document);
      $target.quail({ jsonPath : '../../../src/resources',
                      guideline : [ testName ],
                      reset : true,
                      accessibilityTests : accessibilityTests,
                      complete : function(results) {
                        $.each(results.results[testName], function(index, item) {
                          if(typeof item === 'undefined' ||
                             (item && item.attr('id') && item.attr('id').indexOf('qunit-') !== -1) ||
                             item.parents('#qunit-wrapper').length) {
                            results.results[testName].splice(index, 1);
                          }
                        });
                        quailTest.results = results.results;
                      }});
  },

  confirmIsEmpty : function() {
    if(quailTest.results[quailTest.testName].length) {
      return false;
    }
    return true;
  },

  confirmIsTag : function(tag) {
    if(typeof quailTest.results[quailTest.testName][0] === 'undefined') {
      return false;
    }
    return quailTest.results[quailTest.testName][0].is(tag);
  },
  
  insertElements : function(callback) {
    
      $('body').prepend('<div role="header" id="qunit-wrapper"><h2 id="qunit-banner"></h2><div id="qunit-testrunner-toolbar"></div><h2 id="qunit-userAgent"></h2><ol id="qunit-tests"></ol><div id="qunit-fixture">test markup, will be hidden</div></div>');
   
  }
};


quailTest.insertElements();