var Case = require('Case');
const DOM = require('DOM');
var TableAxisHasCorrespondingId = {
  run: function (test) {
    DOM.scry('[axis]', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      if (DOM.scry('th#' + $(element).attr('axis', element).parents('table').first()).length === 0) {
        _case.set({
          status: 'failed'
        });
      }
      else {
        _case.set({
          status: 'passed'
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Axis attribute should have corresponding IDs',
      nl: 'Axis-attributen moeten bijbehorende IDs hebben'
    },
    description: {
      en: 'When using the axis attribute to group cells together, ensure they have a target element with the same ID.',
      nl: 'Wanneer er axis-attributen gebruikt worden om cellen te groeperen, zorg er dan voor dat hun doelelement hetzelfde ID heeft.'
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
    }
  }
};
module.exports = TableAxisHasCorrespondingId;
