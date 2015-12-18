/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ScriptsDoNotFlicker = {
  run: function (test, options) {

    var selector = 'script';

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
    testability: 0,
    title: {
      en: 'Scripts should not cause the screen to flicker',
      nl: 'Scripts mogen het scherm niet laten knipperen of flitsen'
    },
    description: {
      en: 'All scripts should be assessed to see if their interface does not flicker.',
      nl: 'Alle scripts moeten gecontroleerd worden om te zien of zij de interface niet laten knipperen of flitsen.'
    },
    guidelines: {
      508: [
        'j'
      ],
      wcag: {
        '2.2.2': {
          techniques: [
            'F7'
          ]
        }
      }
    },
    tags: [
      'javascript'
    ]
  }
};
module.exports = ScriptsDoNotFlicker;
