quail.lib.EarlAssert = (function () {

  var resultPrioMap = [
    'untested', 'inapplicable', 'passed',
    'cantTell', 'failed'
  ];

  /**
   * Create a new earl assert object
   * @param {object} base An object on which the values of Assert are based
   */
  function Assert(base) {
    var earlAssert = $.extend({}, base, Assert.defaultAssert);

    earlAssert.outcome = $.extend({}, earlAssert.outcome);

    return earlAssert;
  }

  Assert.defaultAssert = {
    // type: 'assert',
    // subject: '',
    // assertedBy: '',
    // mode: 'automated'
  };

  /**
   * Return the priorty index of the result
   * @param  {result|assert|outcome} val
   * @return {integer}     Result index in order of prioerty
   */
  Assert.getResultPrio = function (val) {
    if (typeof val === 'object') {
      if (val.outcome) {
        val = val.outcome.result;
      } else {
        val = val.result;
      }
    }
    return resultPrioMap.indexOf(val);
  };

  return Assert;

}());