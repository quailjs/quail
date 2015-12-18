/**
 * @todo Needs refinement.
 *
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var LinkUsedForAlternateContent = {
  run: function (test, options) {

    var selector = 'html:not(html:has(link[rel=alternate])) body';

    this.get('scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: (options.test ? 'inapplicable' : 'passed')
        }));
      }
      else {
        candidates.each(function () {
          var status;

          // If a test is defined, then use it
          if (options.test && !$(this).is(options.test)) {
            status = 'passed';
          }
          else {
            status = 'failed';
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
    testability: 0,
    title: {
      en: 'Use a \"link\" element for alternate content',
      nl: 'Gebruik een \"link\"-element for andersoortige content'
    },
    description: {
      en: 'Documents which contain things like videos, sound, or other forms of media that are not accessible, should provide a <code>link</code> element with a \"rel\" attribute of \"alternate\" in the document header.',
      nl: 'Documenten die content zoals video\'s, geluid of andere niet-toegankelijke vormen van media bevatten, moeten een <code>link</code>-element met een \"rel\"-attribuut of \"alternate\" in de documentheaderlink aanbieden.'
    },
    guidelines: [

    ],
    tags: [
      'document'
    ]
  }
};
module.exports = LinkUsedForAlternateContent;
