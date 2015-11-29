var Case = require('Case');
var PreShouldNotBeUsedForTabularLayout = {
  run: function (test) {
    test.get('$scope').find('pre').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      var rows = $(this).text().split(/[\n\r]+/);
      _case.set({
        status: (rows.length > 1 && $(this).text().search(/\t/) > -1) ? 'failed' : 'passed'
      });
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Pre elements should not be used for tabular data',
      nl: 'Pre-elementen worden niet gebruikt om data als tabel te rangschikken'
    },
    description: {
      en: 'If a <code>pre</code> element is used for tabular data, change the data to use a well-formed table.',
      nl: 'Als een <code>pre</code>-element wordt gebruikt om data als tabel te rangschikken, verander de data dan zodat je een echte tabel kunt maken.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'F33',
            'F34',
            'F48'
          ]
        },
        '1.3.2': {
          techniques: [
            'F33',
            'F34'
          ]
        }
      }
    },
    tags: [
      'table',
      'content'
    ]
  }
};
module.exports = PreShouldNotBeUsedForTabularLayout;
