/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var ScriptsDoNotUseColorAlone = {
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
      en: 'The interface in scripts should not use color alone',
      nl: 'De interface in scripts gebruikt niet alleen maar kleur'
    },
    description: {
      en: 'All scripts should be assessed to see if their interface does not have an interface which requires distinguishing between colors alone.',
      nl: 'Alle scripts moeten gecontroleerd worden om te zien of hun interface geen interface heeft die alleen op kleur kan worden onderscheiden.'
    },
    guidelines: {
      508: [
        'c'
      ]
    },
    tags: [
      'javascript',
      'color'
    ]
  }
};
module.exports = ScriptsDoNotUseColorAlone;
