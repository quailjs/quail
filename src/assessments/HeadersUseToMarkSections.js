var Case = require('Case');
const DOM = require('DOM');
var HeadersUseToMarkSections = {
  run: function (test) {
    DOM.scry('p', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      var $paragraph = $(element);
      DOM.scry('strong:first, em:first, i:first, b:first', $paragraph).forEach(function (element) {
        _case.set({
          status: ($paragraph.text().trim() === $(element).text().trim()) ? 'failed' : 'passed'
        });
      });
    });

    DOM.scry('ul, ol', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      var $list = $(element);
      if ($list.prevAll(':header').length ||
        DOM.scry('li', $list).length !== DOM.scry('li:has(a)', $list).length) {
        _case.set({
          status: 'passed'
        });
        return;
      }
      var isNavigation = true;
      DOM.scry('li:has(a)', $list).forEach(function (element) {
        if (DOM.scry('a:first', element).text().trim() !== $(element).text().trim()) {
          isNavigation = false;
        }
      });
      if (isNavigation) {
        _case.set({
          status: 'failed'
        });
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Use headers to mark the beginning of each section',
      nl: 'Gebruik headers om de start van elke sectie aan te geven.'
    },
    description: {
      en: 'Check that each logical section of the page is broken or introduced with a header (h1-h6) element.',
      nl: 'Controleer dat elke logische sectie van een pagina wordt onderbroken door of start met een header-element (h1-h6).'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'G141'
          ]
        },
        '2.4.1': {
          techniques: [
            'G141',
            'H69'
          ]
        }
      }
    },
    tags: [
      'header',
      'content'
    ]
  }
};
module.exports = HeadersUseToMarkSections;
