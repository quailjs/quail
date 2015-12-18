var Case = require('Case');
const DOM = require('DOM');
var DOM = require('DOM');
var TableUsesScopeForRow = {
  run: function (test) {
    DOM.scry('table', test.get('scope')).each(function () {
      DOM.scry('td:first-child', this).each(function () {
        var $next = $(this).next('td');
        if (($(this).css('font-weight') === 'bold' && $next.css('font-weight') !== 'bold') ||
             (DOM.scry('strong', this).length && !DOM.scry('strong', $next).length)) {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        }
      });
      DOM.scry('td:last-child', this).each(function () {
        var $prev = $(this).prev('td');
        if (($(this).css('font-weight') === 'bold' && $prev.css('font-weight') !== 'bold') ||
            (DOM.scry('strong', this).length && !DOM.scry('strong', $prev).length)) {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        }
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
