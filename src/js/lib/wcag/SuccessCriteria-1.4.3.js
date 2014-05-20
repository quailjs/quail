quail.guidelines.wcag.successCriteria['1.4.3'] = (function (quail) {
  // Create a new SuccessCriteria.
  var sc = quail.lib.SuccessCriteria();

  // Define an evaluation algorithm.
  sc.registerEvaluator(function (tests) {
    tests = tests;
    //var tests.getByResult('failed');
  });

  return sc;
}(quail));
