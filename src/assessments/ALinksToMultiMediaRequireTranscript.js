var Case = require('Case');
var ALinksToMultiMediaRequireTranscript = {
  run: function (test) {
    var selector = [
      'a[href$=".wmv"]',
      'a[href$=".mpg"]',
      'a[href$=".mov"]',
      'a[href$=".ram"]',
      'a[href$=".aif"]'
    ].join(', ');

    this.get('$scope').each(function () {
      var candidates = $(this).find(selector);
      // Inapplicable.
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        // cantTell.
        candidates.each(function () {
          test.add(Case({
            element: this,
            status: 'cantTell'
          }));
        });
      }
    });
  },

  meta: {
    replace: 'this'
  }
};
module.exports = ALinksToMultiMediaRequireTranscript;
