/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var DocumentMetaNotUsedWithTimeout = {
  run: function (test) {

    var selector = 'meta';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, $(this));

      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'passed';

          if (this.hasAttribute('http-equiv') && this.getAttribute('http-equiv') === 'refresh') {
            if (this.hasAttribute('content') && (this.getAttribute('content') || '').length > 0) {
              status = 'failed';
            }
          }

          test.add(Case({
            element: this,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Meta elements must not be used to refresh the content of a page',
      nl: 'Meta-elementen mogen niet worden gebruikt om content op een pagina te verversen'
    },
    description: {
      en: 'Because different users have different speeds and abilities when it comes to parsing the content of a page, a \"meta-refresh\" method to reload the content of the page can prevent users from having full access to the content. Try to use a \"refresh this\" link instead.',
      nl: 'Omdat verschillende gebruikers verschillende snelheden en vaardigheden hebben met het scannen van content op een pagina, kan een \"meta-refresh\"-methode om de pagina te herladen gebruikers hinderen in toegang tot de content. Gebruik een \"refresh this\" link hiervoor.'
    },
    guidelines: {
      wcag: {
        '2.2.1': {
          techniques: [
            'F40',
            'F41'
          ]
        },
        '2.2.4': {
          techniques: [
            'F40',
            'F41'
          ]
        },
        '3.2.5': {
          techniques: [
            'F41'
          ]
        }
      }
    },
    tags: [
      'document'
    ]
  }
};
module.exports = DocumentMetaNotUsedWithTimeout;
