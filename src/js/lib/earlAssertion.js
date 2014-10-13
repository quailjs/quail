quail.lib.EarlAssertion = (function () {
  var pageUrl;
  var resultPriorityMap = [
    'untested', 'inapplicable', 'passed',
    'cantTell', 'failed'
  ];

  if (window && window.location) {
    pageUrl = window.location.href;
  }

  /**
   * Create a new earl assert object
   * @param {object} base An object on which the values of Assert are based
   */
  function Assertion(base) {
    var earlAssertion = $.extend({}, base, Assertion.defaultAssert);

    earlAssertion.outcome = $.extend({}, earlAssertion.outcome);

    return earlAssertion;
  }

  Assertion.defaultAssertion = {
    type: 'assertion',
    subject: pageUrl,
    assertedBy: {
      type: 'earl:Software',
      name: 'QuailJS'
    },
    mode: 'automated'
  };

  /**
   * Return the priorty index of the result
   * @param  {result|assert|outcome} val
   * @return {integer}     Result index in order of prioerty
   */
  Assertion.getResultPriority = function (val) {
    if (typeof val === 'object') {
      if (val.outcome) {
        val = val.outcome.result;
      } else {
        val = val.result;
      }
    }
    return resultPriorityMap.indexOf(val);
  };

  return Assertion;

}());