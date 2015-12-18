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

var LinkUsedToDescribeNavigation = {
  run: function (test, options) {

    var selector = 'html:not(html:has(link[rel=index]))';

    this.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
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
    testability: 1,
    title: {
      en: 'The document uses link elements to describe navigation if it is within a collection.',
      nl: 'Het document gebruikt link-elementen om navigatie te beschrijven wanneer het binnen een collectie staat.'
    },
    description: {
      en: 'The link element can provide metadata about the position of an HTML page within a set of Web units or can assist in locating content with a set of Web units.',
      nl: 'Het link-element kan metadata bevatten over de positie van een HTML-pagina binnen een swet web units, of kan behulpzaamn zijn bij het lokaliseren van content binnen web units.'
    },
    guidelines: [

    ],
    tags: [
      'document'
    ]
  }
};
module.exports = LinkUsedToDescribeNavigation;
