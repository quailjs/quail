var Case = require('Case');
var ColorComponent = require('ColorComponent');
var ColorFontContrast = {
  run: function (test, options) {

    options = options || {};

    var colors = ColorComponent.colors;
    var buildCase = ColorComponent.buildCase;
    var id = 'colorFontContrast';
    // Hard-coding this for now. Requires a way to pass options from the test
    // definitions down to the test functions.
    options.algorithm = 'wcag';
    options.gradientSampleMultiplier = 3;

    /**
     *
     */
    function colorFontContrast (test, Case, options, $this, element) {
      // Check text and background color using DOM.
      // Build a case.
      if (!colors.testElmContrast(options.algorithm, $this)) {
        buildCase(test, Case, element, 'failed', id, 'The font contrast of the text impairs readability');
      }
      else {
        buildCase(test, Case, element, 'passed', id, 'The font contrast of the text is sufficient for readability');
      }
    }

    test.get('scope').forEach(function (scope) {
      var textNodes = document.evaluate(
        'descendant::text()[normalize-space()]',
        this,
        null,
        window.XPathResult.ORDERED_NODE_ITERATOR_TYPE,
        null
      );
      var nodes = [];
      var textNode = textNodes.iterateNext();

      // Loop has to be separated. If we try to iterate and rund testCandidates
      // the xpath thing will crash because document is being modified.
      while (textNode) {
        if (ColorComponent.textShouldBeTested(textNode)) {
          nodes.push(textNode.parentNode);
        }
        textNode = textNodes.iterateNext();
      }

      if (nodes.length === 0) {
        buildCase(test, Case, null, 'inapplicable', '', 'There is no text to evaluate');
      }

      nodes.forEach(function (element) {
        colorFontContrast(test, Case, options, $(element), element);
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All elements should have appropriate color contrast',
      nl: 'Alle elementen moeten een toepasselijk kleurcontract hebben'
    },
    description: {
      en: 'For users who have color blindness, all text or other elements should have a color contrast of 5:1.',
      nl: 'Voor gebruikers met kleurenblindheid moeten alle tekst- en andere elementen een kleurcontrast hebben van 5:1.'
    },
    guidelines: {
      wcag: {
        '1.4.3': {
          techniques: [
            'G18'
          ]
        }
      }
    },
    tags: [
      'color'
    ]
  }
};
module.exports = ColorFontContrast;
