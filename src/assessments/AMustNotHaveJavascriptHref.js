/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var AMustNotHaveJavascriptHref = {
  run: function (test, options) {

    options = options || {};

    var selector = 'a[href^="javascript:"]';

    test.get('scope').each(function () {
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
      en: 'Links should not use \"javascript\" in their location',
      nl: 'Links moeten geen \"javascript\" in hun locatie hebben'
    },
    description: {
      en: 'Anchor (<code>a</code>.  elements may not use the \"javascript\" protocol in their \"href\" attributes.',
      nl: 'Anchor(<code>a</code>.-elementen mogen geen \"javascript\"protocol in hun \"href\"-attributen hebben staan.'
    },
    guidelines: [

    ],
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = AMustNotHaveJavascriptHref;
