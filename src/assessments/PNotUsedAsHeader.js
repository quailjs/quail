var Case = require('Case');
var SuspectPHeaderTags = require('SuspectPHeaderTags');
var SuspectPCSSStyles = require('SuspectPCSSStyles');
var PNotUsedAsHeader = {
  run: function (test) {
    test.get('$scope').find('p').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);

      var $paragraph = $(this);

      // If the text has a period, it is probably a sentence and not a header.
      if ($paragraph.text().search(/[\.!:;]/) >= 1) {
        _case.set({
          status: 'passed'
        });
      }
      var failed = false;
      // Look for any indication that the paragraph contains at least a full sentence
      if ($(this).text().search(/[\.!:;]/) < 1) {
        var priorParagraph = $paragraph.prev('p');
        // Checking if any of SuspectPHeaderTags has exact the same text as a paragraph.
        $.each(SuspectPHeaderTags, function (index, tag) {
          if ($paragraph.find(tag).length) {
            $paragraph.find(tag).each(function () {
              if ($(this).text().trim() === $paragraph.text().trim()) {
                _case.set({
                  status: 'failed'
                });
                failed = true;
              }
            });
          }
        });
        // Checking if previous paragraph has a different values for style properties given in SuspectPCSSStyles.
        if (priorParagraph.length) {
          $.each(SuspectPCSSStyles, function (index, cssProperty) {
            if ($paragraph.css(cssProperty) !== priorParagraph.css(cssProperty)) {
              _case.set({
                status: 'failed'
              });
              failed = true;
              return false; // Micro optimization - we no longer need to iterate here. jQuery css() method might be expensive.
            }
          });
        }
        if ($paragraph.css('font-weight') === 'bold') {
          _case.set({
            status: 'failed'
          });
          failed = true;
        }
      }
      if (!failed) {
        _case.set({
          status: 'passed'
        });
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Paragraphs must not be used for headers',
      nl: 'Alinea\'s worden niet gebruikt als header'
    },
    description: {
      en: 'Headers like <code>h1</code> - <code>h6</code> are extremely useful for non-sighted users to navigate the structure of the page, and formatting a paragraph to just be big or bold, while it might visually look like a header, does not make it one.',
      nl: 'Headers van <code>h1</code> - <code>h6</code> zijn handig voor blinde en slechtziende gebruikers om door een pagina te navigeren. Maak alinea\'s daarom niet op zodat deze lijkt op een header. Dit werkt verwarrend.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'G141',
            'H42'
          ]
        },
        '2.4.10': {
          techniques: [
            'G141'
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
module.exports = PNotUsedAsHeader;
