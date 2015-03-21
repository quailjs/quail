quail.aLinksToMultiMediaRequireTranscript = function (quail, test, Case) {
  this.get('$scope').each(function () {
    var candidates = $(this).find('a[href$=".wmv"], a[href$=".mpg"], a[href$=".mov"], a[href$=".ram"], a[href$=".aif"]');
    // Inapplicable.
    if (!candidates.length) {
      test.add(quail.lib.Case({
        element: undefined,
        status: 'inapplicable'
      }));
    }
    else {
      // cantTell.
      candidates.each(function () {
        test.add(quail.lib.Case({
          element: this,
          status: 'cantTell'
        }));
      });
    }
  });
};
