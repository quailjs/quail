var Case = require('Case');
var LabelMustBeUnique = {
  run: function (test) {
    var labels = {};
    DOM.scry('label[for]', test.get('scope')).each(function () {
      if (typeof labels[$(this).attr('for')] === 'undefined') {
        labels[$(this).attr('for')] = 0;
      }
      labels[$(this).attr('for')]++;
    });
    DOM.scry('label[for]', test.get('scope')).each(function () {
      var _case = Case({
        element: this,
        status: (labels[$(this).attr('for')] === 1) ?
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
