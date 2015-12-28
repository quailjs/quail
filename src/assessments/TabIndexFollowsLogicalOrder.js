var Case = require('Case');
const DOM = require('DOM');
var TabIndexFollowsLogicalOrder = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      var $local = $(this);
      var index = 0;
      DOM.scry('[tabindex]', $local).forEach(function (element) {
        var $el = $(element);
        var tabindex = $el.attr('tabindex');
        if (parseInt(tabindex, 10) >= 0 && parseInt(tabindex, 10) !== index + 1) {
          test.add(Case({
            element: element,
            status: 'failed'
          }));
        }
        else {
          test.add(Case({
            element: element,
            status: 'passed'
          }));
        }
        index++;
      });
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'The tab order of a document is logical',
      nl: 'De tabvolgorde van een document is logisch'
    },
    description: {
      en: 'Check that the tab order of a page is logical.',
      nl: 'Controleer of de tabvolgorde van een pagina logisch is.'
    },
    guidelines: {
      wcag: {
        '2.4.3': {
          techniques: [
            'H4'
          ]
        }
      }
    },
    tags: [
      'document'
    ]
  }
};
module.exports = TabIndexFollowsLogicalOrder;
