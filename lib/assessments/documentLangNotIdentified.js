/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
quail.documentLangNotIdentified = function (quail, test, Case) {
  this.get('$scope').each(function () {
    var lang = ('getAttribute' in this) && this.getAttribute('lang');
    if (lang && lang.length > 1) {
      test.add(quail.lib.Case({
        element: this,
        status: 'passed'
      }));
    }
    else {
      test.add(quail.lib.Case({
        element: this,
        status: 'failed'
      }));
    }
  });
};
