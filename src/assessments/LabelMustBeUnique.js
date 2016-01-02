var Case = require('Case');
const DOM = require('DOM');
var LabelMustBeUnique = {
  run: function (test) {
    var labels = {};
    test.get('scope').forEach(function (scope) {
      let labels = DOM.scry('label[for]', scope)

      labels.forEach(function (element) {
        if (typeof labels[DOM.getAttribute(element, 'for')] === 'undefined') {
          labels[DOM.getAttribute(element, 'for')] = 0;
        }
        labels[DOM.getAttribute(element, 'for')]++;
      });

      labels.forEach(function (element) {
        var _case = Case({
          element: element,
          status: (labels[DOM.getAttribute(element, 'for')] === 1) ?
            'passed' :
            'failed'
        });
        test.add(_case);
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Every form input must have only one label',
      nl: 'Elk formulierinvoerveld heeft maar een label'
    },
    description: {
      en: 'Each form input should have only one <code>label</code> element.',
      nl: 'Elk formulierinvoerveld mag maar een <code>label</code> element hebben.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'F17'
          ]
        },
        '4.1.1': {
          techniques: [
            'F17'
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
module.exports = LabelMustBeUnique;
