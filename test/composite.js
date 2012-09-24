var accessibilityTests = { };

$.ajax({ url : '../../../src/resources/tests.json',
 async : false,
 dataType : 'json',
 cache : false,
 success : function(data) {
    if(typeof data == 'object') {
      accessibilityTests = data;
    }
}});
var quailTest = {

  results : { },

  testName : '',

  runTest : function(testName) {
    quailTest.testName = testName;
    quailTest.results = $('html').quail({ jsonPath : '../../../src/resources',
                      guideline : [ testName ],
                      reset : true,
                      accessibilityTests : accessibilityTests,
                      getRawResults : true});
  },

  confirmIsEmpty : function() {
    return quailTest.results[quailTest.testName].length == 0;
  },

  confirmIsTag : function(tag) {
    if(typeof quailTest.results[quailTest.testName][0] == 'undefined') {
      return false;
    }
    return quailTest.results[quailTest.testName][0].is(tag);
  }
};