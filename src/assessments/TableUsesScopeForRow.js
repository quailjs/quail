var Case = require('Case');
const DOM = require('DOM');
var TableUsesScopeForRow = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('table', scope).forEach(function (element) {
        DOM.scry('td:first-child', element).forEach(function (element) {
          var next = DOM.next(element);
          if (next) {
            var isBold = DOM.getComputedStyle(element, 'font-weight') === 'bold';
            var nextIsNotBold = DOM.getComputedStyle(next, 'font-weight') !== 'bold';
            var boldDoesNotFollowsBold = (isBold && nextIsNotBold);
            var hasStrong = DOM.scry('strong', element).length
            var nextIsNotStrong = DOM.scry('strong', next).length === 0;
            var strongDoesNotFollowStrong = (hasStrong && nextIsNotStrong);

            if (boldDoesNotFollowsBold || strongDoesNotFollowStrong) {
              test.add(new Case({
                element: element,
                status: 'failed'
              }));
            }
          }
        });
        DOM.scry('td:last-child', element).forEach(function (element) {
          var $prev = DOM.prev(element);
          var isBold = DOM.getComputedStyle(element, 'font-weight') === 'bold';
          var prevIsNotBold = DOM.getComputedStyle($prev, 'font-weight') !== 'bold';
          var boldDoesNotFollowsBold = (isBold && prevIsNotBold);
          var hasStrong = DOM.scry('strong', element).length
          var prevIsNotStrong = DOM.scry('strong', $prev).length === 0;
          var strongDoesNotFollowStrong = (hasStrong && prevIsNotStrong);

          if (boldDoesNotFollowsBold || strongDoesNotFollowStrong) {
            test.add(new Case({
              element: element,
              status: 'failed'
            }));
          }
        });
      });
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Data tables should use scoped headers for rows with headers',
      nl: 'Datatabellen moeten het \"scope\"-attribuut gebruiken voor rijen met koppen'
    },
    description: {
      en: 'Where there are table headers for both rows and columns, use the \"scope\" attribute to help relate those headers with their appropriate cells. This test looks for the first and last cells in each row and sees if they differ in layout or font weight.',
      nl: 'Als er tabelkoppen zijn voor zowel rijen als kolommen, gebruik dan het \"scope\"-attribuut om het juiste verband te leggen tussen de koppen en bijbehorende cellen.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'H63'
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
module.exports = TableUsesScopeForRow;
