/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var ObjectUIMustBeAccessible = {
  run: function (test, options) {

    var selector = 'object';

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
      en: 'Content within an \"object\" element should be usable with objects disabled',
      nl: 'Content binnen een \"object\"-element moet bruikbaar blijven als het object uitgeschakeld is'
    },
    description: {
      en: 'Objects who\'s content changes using java, ActiveX, or other similar technologies, should have their default text change when the object\'s content changes.',
      nl: 'Van objecten waarvan de content java, ActiveX of vergelijkbare technologie�n gebruiken, moet de standaardtekst veranderen als de content van het object verandert.'
    },
    guidelines: [

    ],
    tags: [
      'objects',
      'content'
    ]
  }
};
module.exports = ObjectUIMustBeAccessible;
