var Case = require('Case');
const DOM = require('DOM');
var ContentPositioningShouldNotChangeMeaning = {
  run: function (test) {
    // Look for absolute positioned elements that are being put into grids or columns.
    var positions = [
      'top',
      'left',
      'right',
      'bottom'
    ];
    var coordinates = {};
    var failed = false;
    DOM.scry('*:has(*:quailCss(position=absolute))', test.get('scope')).forEach(function (element) {
      coordinates = {
        top: {},
        left: {},
        right: {},
        bottom: {}
      };
      failed = false;
      var $container = element;
      DOM.scry('h1, h2, h3, h4, h5, h6, p, blockquote, ol, li, ul, dd, dt', $container).filter(':quailCss(position=absolute)').forEach(function (element) {
        for (var i = 0; i < positions.length; i++) {
          if (typeof DOM.getComputedStyle(element, positions[i]) !== 'undefined' && DOM.getComputedStyle(element, positions[i]) !== 'auto') {
            if (typeof coordinates[positions[i]][DOM.getComputedStyle(element, positions[i])] === 'undefined') {
              coordinates[positions[i]][DOM.getComputedStyle(element, positions[i])] = 0;
            }
            coordinates[positions[i]][DOM.getComputedStyle(element, positions[i])]++;
          }
        }
      });

      positions.forEach(function (pos) {
        coordinates[pos].forEach(function (coord) {
          if (coord > 2 && !failed) {
            failed = true;
            test.add(Case({
              element: $container,
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
      en: 'Meaning should not be created through positioning',
      nl: 'Cre�er geen betekenis door positionering'
    },
    description: {
      en: 'Positioning should not be used to change the meaning of an element.',
      nl: 'Positionering moet niet worden gebruikt om de betekenis van een element te veranderen.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques: [
            'C6',
            'F1',
            'G57'
          ]
        },
        '1.4.5': {
          techniques: [
            'C6'
          ]
        },
        '1.4.9': {
          techniques: [
            'C6'
          ]
        },
        '2.4.1': {
          techniques: [
            'C6'
          ]
        }
      }
    },
    tags: [
      'content',
      'structure'
    ]
  }
};
module.exports = ContentPositioningShouldNotChangeMeaning;
