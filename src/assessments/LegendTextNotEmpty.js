/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var LegendTextNotEmpty = {
  run: function (test) {

    var selector = 'legend';

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
          var status = 'failed';

          if ($(this).text().trim().length > 0) {
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
      en: 'Legend text must not contain just whitespace',
      nl: 'Legend-tekst moet ingevuld zijn'
    },
    description: {
      en: 'If a <code>legend</code> element is used in a fieldset, the <code>legend</code> should not contain empty text.',
      nl: 'Als een <code>legend</code>-element wordt gebruikt in een fieldset, moet de <code>legend</code> ingevuld zijn.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H71'
          ]
        },
        '2.4.6': {
          techniques: [
            'G131'
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
module.exports = LegendTextNotEmpty;
