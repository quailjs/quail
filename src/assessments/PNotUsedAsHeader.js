var Case = require('Case');
const DOM = require('DOM');
var SuspectPHeaderTags = require('SuspectPHeaderTags');
var SuspectPCSSStyles = require('SuspectPCSSStyles');
var PNotUsedAsHeader = {
  run: function (test) {
    DOM.scry('p', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);

      var $paragraph = element;

      // If the text has a period, it is probably a sentence and not a header.
      if (DOM.text($paragraph).search(/[\.!:;]/) >= 1) {
        _case.set({
          status: 'passed'
        });
      }
      var failed = false;
      // Look for any indication that the paragraph contains at least a full sentence
      if (DOM.text(element).search(/[\.!:;]/) < 1) {
        var priorParagraph = $paragraph.prev('p');
        // Checking if any of SuspectPHeaderTags has exact the same text as a paragraph.
        SuspectPHeaderTags.forEach(function (tag) {
          if (DOM.scry(tag, $paragraph).length) {
            DOM.scry(tag, $paragraph).forEach(function (element) {
              if (DOM.text(element).trim() === DOM.text($paragraph).trim()) {
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
          SuspectPCSSStyles.forEach(function (cssProperty) {
            if (DOM.getStyle($paragraph, cssProperty) !== DOM.getStyle(priorParagraph, cssProperty)) {
              _case.set({
                status: 'failed'
              });
              failed = true;
              return false; // Micro optimization - we no longer need to iterate here. jQuery css() method might be expensive.
            }
          });
        }
        if (DOM.getStyle($paragraph, 'font-weight') === 'bold') {
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
