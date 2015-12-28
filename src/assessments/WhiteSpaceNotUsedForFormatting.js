var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
const DOM = require('DOM');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var WhiteSpaceNotUsedForFormatting = {
  run: function (test) {
    DOM.scry(TextSelectorComponent, test.get('scope'))
      .filter(function (element, index) {
        return TextNodeFilterComponent(element);
      })
      .each(function () {
        var _case = test.add(Case({
          element: this
        }));
        if (DOM.scry('br', this).length === 0) {
          _case.set({status: 'passed'});
          return;
        }
        var lines = $(this).html().toLowerCase().split(/(<br\ ?\/?>)+/);
        var lineCount = 0;
        lines.forEach(function (line, index) {
          if (line.search(/(\s|\&nbsp;) {2,}/g) !== -1) {
            lineCount++;
          }
        });
        if (lineCount > 1) {
          _case.set({status: 'failed'});
        }
        else {
          _case.set({status: 'cantTell'});
        }
      });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Whitespace should not be used for conveying information',
      nl: 'Gebruik geen witruimte om informatie over te brengen'
    },
    description: {
      en: 'Spaces or tabs are not read by assistive technology and should not be used to convey meaning.',
      nl: 'Spaties of tabs worden niet voorgelezen door hulpprogramma\'s en moeten niet worden gebruikt om betekenis over te dragen.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques: [
            'G57'
          ]
        }
      }
    },
    tags: [
      'content'
    ]
  }
};
module.exports = WhiteSpaceNotUsedForFormatting;
