/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var ObjectMustHaveValidTitle = {
  run: function (test, options) {
    options = options || {
      selector: 'object',
      attribute: 'title',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'Objects must not have an empty title attribute',
      nl: 'Objecten hebben geen leeg titelattribuut'
    },
    description: {
      en: 'All <code>object</code> elements should have a \"title\" attribute which is not empty.',
      nl: 'All <code>object</code>-elementen hebben een \"titel\"-attribuut dat gevuld is.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectMustHaveValidTitle;
