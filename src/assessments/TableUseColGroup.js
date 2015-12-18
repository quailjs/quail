var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var DOM = require('DOM');
var TableUseColGroup = {
  run: function (test) {
    DOM.scry('table', test.get('scope')).each(function () {
      if (IsDataTableComponent(DOM.scry('colgroup', this)) && !$(this).length) {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Group columns using \"colgroup\" or \"col\" elements',
      nl: 'Groepeer kolommen met \"colgroup\"- of \"col\"-elementen'
    },
    description: {
      en: 'To help complex table headers make sense, use <code>colgroup</code> or <code>col</code> to group them together.',
      nl: 'Maak complexe tabelkoppen duidelijker door \"colgroup\"- of \"col\"-elementen te gebruiken om ze te groeperen.'
    },
    guidelines: [

    ],
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = TableUseColGroup;
