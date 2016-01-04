var Case = require('Case');
const DOM = require('DOM');
var BlockquoteUseForQuotations = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('p', scope).forEach(function (element) {
        var _case = Case({
          element: element
        });
        test.add(_case);
        var blockquote = DOM.parents(element)
          .find((parent) => DOM.is(parent, 'blockquote'));
        if (blockquote) {
          _case.set({
            status: 'inapplicable'
          });
          return;
        }
        if (DOM.text(element).substr(0, 1).search(/'|"|«|“|「/) > -1 &&
           DOM.text(element).substr(-1, 1).search(/'|"|»|„|」/) > -1) {
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
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'If long quotes are in the document, use the \"blockquote\" element to mark them',
      nl: 'Gebruik voor lange citaten in het document het \"blockquote\"-element'
    },
    description: {
      en: 'If there is a paragraph or more of a quote, use the blockquote element to mark it as such.',
      nl: 'Als er een hele alinea of meer alinea\'s zijn van geciteerde tekst, gebruik dan blockquote om deze als zodanig te markeren.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H49'
          ]
        }
      }
    },
    tags: [
      'blockquote',
      'content'
    ]
  }
};
module.exports = BlockquoteUseForQuotations;
