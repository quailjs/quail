var Case = require('Case');
const DOM = require('DOM');
var LabelsAreAssignedToAnInput = {
  run: function (test) {
    DOM.scry('label', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      if (!$(element).attr('for')) {
        _case.set({
          status: 'failed'
        });
      }
      else {
        if (!DOM.scry('#' + $(element).attr('for'), test.get('scope')).length ||
           !DOM.scry('#' + $(element).attr('for')).is(':input'), test.get('scope')) {
          _case.set({
            status: 'failed'
          });
        }
        else {
          _case.set({
            status: 'passed'
          });
        }
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All labels should be associated with an input',
      nl: 'Alle labels moeten horen bij een invoerveld'
    },
    description: {
      en: 'All <code>label</code> elements should be assigned to an input item, and should have a <em>for</em> attribute which equals the <em>id</em> attribute of a form element.',
      nl: 'Alle <code>label</code>-elementen moeten horen bij een invoerveld, en moeten een een <em>for</em>-attribuut hebben dat hetzelfde is als het <em>id</em>-attribuut van een formulierelement.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = LabelsAreAssignedToAnInput;
