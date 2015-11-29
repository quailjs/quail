var Case = require('Case');
var HeadersUseToMarkSections = {
  run: function (test) {
    test.get('$scope').find('p').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      var $paragraph = $(this);
      $paragraph.find('strong:first, em:first, i:first, b:first').each(function () {
        _case.set({
          status: ($paragraph.text().trim() === $(this).text().trim()) ? 'failed' : 'passed'
        });
      });
    });

    test.get('$scope').find('ul, ol').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      var $list = $(this);
      if ($list.prevAll(':header').length ||
        $list.find('li').length !== $list.find('li:has(a)').length) {
        _case.set({
          status: 'passed'
        });
        return;
      }
      var isNavigation = true;
      $list.find('li:has(a)').each(function () {
        if ($(this).text().trim() !== $(this).find('a:first').text().trim()) {
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
          techniques:  [
            'G141'
          ]
        },
        '2.4.1': {
          techniques:  [
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
