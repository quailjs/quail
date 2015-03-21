quail.lib.wcag2.EarlAssertion = (function () {
  var pageUrl;
  var resultPriorityMap = [
    'untested', 'inapplicable', 'passed',
    'cantTell', 'failed'
  ];
  var defaultAssertion = {
    type: 'assertion',
    subject: pageUrl,
    assertedBy: {
      type: 'earl:Software',
      name: 'QuailJS'
    },
    mode: 'automated'
  };

  if (window && window.location) {
    pageUrl = window.location.href;
  }

  /**
   * Create a new earl assert object
   * @param {object} base Properties from this object are added to the Assertion
   *                      and override the default.
   */
  function Assertion (base) {
    $.extend(this, base, defaultAssertion);
    this.outcome = $.extend({}, this.outcome);
  }

  /**
   * Return the priorty index of the result
   * @param  {result|assert|outcome} val
   * @return {integer}     Result index in order of prioerty
   */
  Assertion.getResultPriority = function (val) {
    if (typeof val === 'object') {
      if (val.outcome) {
        val = val.outcome.result;
      }
      else {
        val = val.result;
      }
    }
    return resultPriorityMap.indexOf(val);
  };

  return Assertion;

}());
