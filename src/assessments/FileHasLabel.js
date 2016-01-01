/**
 * Test for a label associated with a file input element.
 */
var Case = require('Case');
const DOM = require('DOM');

var FileHasLabel = {
  run: function (test) {

    var sFiles = '[type="file"]';
    var sLabels = 'label';

    function countOfLabelsById (id, labels) {
      // Map labels by for attribute value.
      var labelsByFor = 0;
      for (var i = 0, il = labels.length; i < il; ++i) {
        var $label = labels.eq(i);
        if (DOM.getAttribute($label, 'for') === id) {
          labelsByFor++;
        }
      }
      return labelsByFor;
    }

    test.get('scope').forEach(function (scope) {
      var files = DOM.scry(sFiles, scope);
      var labels = DOM.scry(sLabels, scope);

      if (files.length === 0) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        files.forEach(function (element) {
          var $file = element;
          var status = 'failed';

          // Check for an associated label.
          var id = DOM.getAttribute($file, 'id');
          if (id) {
            var labelCount = countOfLabelsById(id, labels);
            if (labelCount === 1) {
              status = 'passed';
            }
          }

          test.add(Case({
            element: element,
            status: status
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All \"file\" input elements have a corresponding label',
      nl: 'Alle \"file\"-invoerelementen hebben een bijbehorend label'
    },
    description: {
      en: 'All <code>input</code> elements of type \"file\" should have a corresponding <code>label</code> element. Screen readers often enter a \"form mode\" where only label text is read aloud to the user.',
      nl: 'Alle <code>input</code>-elementen van het type \"file\" moeten een bijbehorend <code>label</code>-element hebben. Schermlezers maken vaak gebruik van een \"formuliereninstelling\" waarbij alleen de tekst van de labels hardop aan de gebruiker wordt voorgelezen.'
    },
    guidelines: {
      508: [
        'n'
      ],
      wcag: {
        '1.1.1': {
          techniques: [
            'H44'
          ]
        },
        '1.3.1': {
          techniques: [
            'H44',
            'F68'
          ]
        },
        '3.3.2': {
          techniques: [
            'H44'
          ]
        },
        '4.1.2': {
          techniques: [
            'H44'
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
module.exports = FileHasLabel;
