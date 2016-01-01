var Case = require('Case');
const DOM = require('DOM');
var DocumentIDsMustBeUnique = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      if ($(this).children().length === 0) {
        test.add(Case({
          element: scope,
          status: 'inapplicable'
        }));
      }
    });
    DOM.scry(':not([id])', test.get('scope')).forEach(function (element) {
      test.add(Case({
        element: element,
        status: 'inapplicable'
      }));
    });
    test.get('scope').forEach(function (scope) {
      var ids = {};
      DOM.scry('[id]', scope).forEach(function (element) {
        var _case = Case({
          element: element
        });
        test.add(_case);
        if (typeof ids[DOM.getAttribute(element, 'id')] === 'undefined' && Object.keys(ids).length === 0) {
          _case.set({
            status: 'inapplicable'
          });
          ids[DOM.getAttribute(element, 'id')] = DOM.getAttribute(element, 'id');
        }
        else if (typeof ids[DOM.getAttribute(element, 'id')] === 'undefined') {
          _case.set({
            status: 'passed'
          });
          ids[DOM.getAttribute(element, 'id')] = DOM.getAttribute(element, 'id');
        }
        else {
          _case.set({
            status: 'failed'
          });
        }
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All element \"id\" attributes must be unique',
      nl: 'Alle element \"id\"-attributen moeten uniek zijn'
    },
    description: {
      en: 'Element \"id\" attributes must be unique.',
      nl: 'Element \"id\"-attributen moeten uniek zijn.'
    },
    guidelines: {
      wcag: {
        '4.1.1': {
          techniques: [
            'F77',
            'H93'
          ]
        }
      }
    },
    tags: [
      'document',
      'semantics'
    ]
  }
};
module.exports = DocumentIDsMustBeUnique;
