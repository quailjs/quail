var Case = require('Case');
var RedundantStringsComponent = require('RedundantStringsComponent');
var FormWithRequiredLabel = {
  run: function (test) {
    var redundant = RedundantStringsComponent;
    var lastStyle, currentStyle = false;
    redundant.required[redundant.required.indexOf('*')] = /\*/g;
    test.get('scope').each(function () {
      var $local = $(this);
      DOM.scry('label', $local).each(function () {
        var text = $(this).text().toLowerCase();
        var $label = $(this);
        var _case = test.add(Case({
          element: this
        }));
        for (var word in redundant.required) {
          if (text.search(word) >= 0 && !test.get('scope').find('#' + $label.attr('for')).attr('aria-required')) {
            _case.set({
              status: 'failed'
            });
          }
        }
        currentStyle = $label.css('color') + $label.css('font-weight') + $label.css('background-color');
        if (lastStyle && currentStyle !== lastStyle) {
          _case.set({
            status: 'failed'
          });
        }
        lastStyle = currentStyle;
        if (typeof _case.get('status') === 'undefined') {
          _case.set({
            status: 'passed'
          });
        }
      });
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'Input items which are required are marked as so in the label element',
      nl: 'Invoervelden die verplicht zijn, zijn zo gemarkeerd in het label-element'
    },
    description: {
      en: 'If a form element is required, it should be marked as so. This should not be a mere red asterisk, but instead either a \'required\' image with alt text of \"required\" or the actual text \"required\". The indicator that an item is required should be included in the input element\'s <code>label</code> element.',
      nl: 'Als een formulierveld verplicht is, moet het ook zichtbaar zijn. Doe dit niet alleen met een asterisk achter het veld, maar met bijvoorbeeld een afbeelding met als alttekst \"required\" of de tekst \"required\". De indicatie dat een veld verplicht is moet opgenomen zijn in het <code>label</code>-element van het invoerveld.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'ARIA2'
          ]
        },
        '1.4.1': {
          techniques: [
            'F81'
          ]
        },
        '3.3.2': {
          techniques: [
            'ARIA2',
            'H90'
          ]
        },
        '3.3.3': {
          techniques: [
            'ARIA2'
          ]
        }
      }
    },
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = FormWithRequiredLabel;
