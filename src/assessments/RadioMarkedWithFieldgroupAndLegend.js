/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var RadioMarkedWithFieldgroupAndLegend = {
  run: function (test, options) {

    var selector = 'input[type=radio]:not(fieldset input[type=radio])';

    test.get('scope').forEach(function (scope) {
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
      en: 'All radio button groups are marked using fieldset and legend elements',
      nl: 'Alle groepjes van radio buttons zijn gemarkeerd met fieldset- en legend-elementen'
    },
    description: {
      en: 'Form element content must contain both fieldset and legend elements if there are related radio buttons.',
      nl: 'Content van formulierelementen moeten zowel fieldset- als legend-elementen bevatten als er gerelateerde radio buttons instaan.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H71'
          ]
        },
        '3.3.2': {
          techniques: [
            'H71'
          ]
        }
      }
    },
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = RadioMarkedWithFieldgroupAndLegend;
