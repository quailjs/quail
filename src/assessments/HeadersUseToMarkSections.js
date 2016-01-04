var Case = require('Case');
const DOM = require('DOM');
var HeadersUseToMarkSections = {
  run: function (test) {
    test.get('scope').forEach(function (scope) {
      DOM.scry('p', scope).forEach(function (element) {
        var _case = Case();
        test.add(_case);
        [
          DOM.scry('strong', element)[0],
          DOM.scry('em', element)[0],
          DOM.scry('i', element)[0],
          DOM.scry('b', element)[0]
        ].forEach(function (inlineText) {
          if (inlineText) {
            _case.set({
              element: element,
              status: (DOM.text(inlineText).trim() === DOM.text(element).trim()) ?
                'failed' :
                'passed'
            });
          }
        });
      });
    });

    test.get('scope').forEach(function (scope) {
      DOM.scry('ul, ol', scope).forEach(function (element) {
        var _case = Case({
          element: element
        });
        test.add(_case);
        var $list = element;
        let prevHeaders = DOM.prevAll($list).filter((element) => {
          return DOM.is(element, 'h1, h2, h3, h4, h5, h6');
        });
        let items = DOM.scry('li', $list);
        let itemLinks = DOM.scry('li', $list)
          .filter((element) => DOM.scry('a', element).length > 0);
        if (
          prevHeaders.length ||
          items.length !== itemLinks.length
        ) {
          _case.set({
            status: 'passed'
          });
          return;
        }
        var isNavigation = true;
        itemLinks.forEach(function (element) {
          if (DOM.text(DOM.scry('a', element)[0]).trim() !== DOM.text(element).trim()) {
            isNavigation = false;
          }
        });
        if (isNavigation) {
          _case.set({
            status: 'failed'
          });
        }
      });
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
