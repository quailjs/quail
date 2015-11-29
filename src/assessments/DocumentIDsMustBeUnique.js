var Case = require('Case');
var DocumentIDsMustBeUnique = {
  run: function (test) {
    test.get('$scope').each(function () {
      if ($(this).children().length === 0) {
        test.add(Case({
          element: this,
          status: 'inapplicable'
        }));
      }
    });
    test.get('$scope').find(':not([id])').each(function () {
      test.add(Case({
        element: this,
        status: 'inapplicable'
      }));
    });
    test.get('$scope').each(function () {
      var ids = {};
      $(this).find('[id]').each(function () {
        var _case = Case({
          element: this
        });
        test.add(_case);
        if (typeof ids[$(this).attr('id')] === 'undefined' && Object.keys(ids).length === 0) {
          _case.set({
            status: 'inapplicable'
          });
          ids[$(this).attr('id')] = $(this).attr('id');
        }
        else if (typeof ids[$(this).attr('id')] === 'undefined') {
          _case.set({
            status: 'passed'
          });
          ids[$(this).attr('id')] = $(this).attr('id');
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
