var Case = require('Case');
var ListNotUsedForFormatting = {
  run: function (test) {
    DOM.scry('ol, ul', test.get('scope')).each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      if (DOM.scry('li', this).length < 2) {
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
    testability: 0,
    title: {
      en: 'Lists should not be used for formatting',
      nl: 'Lijsten worden niet gebruikt voor opmaak'
    },
    description: {
      en: 'Lists like <code>ul</code> and <code>ol</code> are to provide a structured list, and should not be used to format text. This test views any list with just one item as suspicious, but should be manually reviewed.',
      nl: 'Lijsten zoals <code>ul</code> en <code>ol</code> zijn bedoeld om gestructureerde lijsten te maken. Ze moeten niet gebruikt worden om text op te maken. Controleer of deze lijst echt bedoeld is als lijst of om tekst op te maken.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques: [
            'F1'
          ]
        }
      }
    },
    tags: [
      'list',
      'content'
    ]
  }
};
module.exports = ListNotUsedForFormatting;
