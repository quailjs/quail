/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var LabelDoesNotContainInput = {
  run: function (test) {

    var selector = 'label';

    this.get('$scope').each(function () {
      var candidates = $(this).find(selector);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.each(function () {
          var status = 'passed';

          if ($(this).find('input').length > 0) {
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
      en: 'Label elements should not contain an input element',
      nl: 'Labelelementen moeten geen invoerelementen bevatten'
    },
    description: {
      en: 'Label elements should not wrap around another input element, as this can cause the label to be read twice by screen readers.',
      nl: 'Labelelementen moeten niet om een ander invoerelement heenstaan, omdat dan het label twee keer kan worden voorgelezen door schermlezers.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = LabelDoesNotContainInput;
