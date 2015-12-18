/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
var DOM = require('DOM');
var ObjectMustHaveEmbed = {
  run: function (test) {

    var selector = 'object';

    this.get('scope').each(function () {
      var candidates = DOM.scry(selector, $(this));
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'failed';
          var hasEmbed = DOM.scry('embed', this).length > 0;

          // If a test is defined, then use it
          if (hasEmbed) {
            status = 'passed';
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
      en: 'Every object should contain an \"embed\" element',
      nl: 'Elk object moet een \"embed\"-element bevatten'
    },
    description: {
      en: 'Every <code>object</code> element must also contain an <code>embed</code> element.',
      nl: 'Elk <code>object</code>-element moet ook een \"embed\"-element bevatten.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectMustHaveEmbed;
