/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var AppletsDonotUseColorAlone = {
  run: function (test, options) {

    options = options || {};

    var selector = 'applet';

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
      en: 'Applets should not use color alone to communicate content',
      nl: 'Applets mogen niet alleen kleur gebruiken om een boodschap over te brengen'
    },
    description: {
      en: 'Applets should contain content that makes sense without color and is accessible to users who are color blind.',
      nl: 'Applets moeten content bevatten die ook bruikbaar is zonder kleur en die toegankelijk is voor gebruikers met kleurenblindheid.'
    },
    guidelines: {
      508: [
        'c'
      ]
    },
    tags: [
      'objects',
      'applet',
      'content'
    ]
  }
};
module.exports = AppletsDonotUseColorAlone;
