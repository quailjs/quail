/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var DocumentAutoRedirectNotUsed = {
  run: function (test) {

    var selector = 'meta[http-equiv=refresh]';

    this.get('scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'passed'
        }));
      }
      else {
        candidates.each(function () {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Auto-redirect with \"meta\" elements must not be used',
      nl: 'Auto-redirect met \"meta\"-elementen moeten niet worden gebruikt'
    },
    description: {
      en: 'Because different users have different speeds and abilities when it comes to parsing the content of a page, a \"meta-refresh\" method to redirect users can prevent users from fully understanding the document before being redirected.',
      nl: 'Omdat verschillende gebruikers verschillende snelheden en vaardigheden hebben met het scannen van content op een pagina, kan een \"meta-refresh\"-methode om gebruikers door te sturen hen verhinderen het document volledig te begrijpen voor ze worden doorgestuurd.'
    },
    guidelines: [

    ],
    tags: [
      'document'
    ]
  }
};
module.exports = DocumentAutoRedirectNotUsed;
