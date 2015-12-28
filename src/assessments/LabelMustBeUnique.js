var Case = require('Case');
const DOM = require('DOM');
var LabelMustBeUnique = {
  run: function (test) {
    var labels = {};
    DOM.scry('label[for]', test.get('scope')).forEach(function (element) {
      if (typeof labels[$(element).attr('for')] === 'undefined') {
        labels[$(element).attr('for')] = 0;
      }
      labels[$(element).attr('for')]++;
    });
    DOM.scry('label[for]', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element,
        status: (labels[$(element).attr('for')] === 1) ?
          'passed' :
          'failed'
      });
      test.add(_case);
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
