var Case = require('Case');
var ColorComponent = require('ColorComponent');
var Rainbow = require('rainbowvis.js/rainbowvis.js');

var ColorBackgroundGradientContrast = {
  run: function (test, options) {

    options = options || {};

    var colors = ColorComponent.colors;
    var buildCase = ColorComponent.buildCase;
    var id = 'colorBackgroundGradientContrast';
    // Hard-coding this for now. Requires a way to pass options from the test
    // definitions down to the test functions.
    options.algorithm = 'wcag';
    options.gradientSampleMultiplier = 3;

    /**
     *
     */
    function colorBackgroundGradientContrast (test, Case, options, $this, element) {
      // Check if there's a background gradient using DOM.
      var failureFound, numberOfSamples;
      var rainbow = new Rainbow();
      var backgroundGradientColors = colors.getBackgroundGradient($this);

      if (!backgroundGradientColors) {
        return;
      }

      // Convert colors to hex notation.
      for (var i = 0; i < backgroundGradientColors.length; i++) {
        if (backgroundGradientColors[i].substr(0, 3) === 'rgb') {
          backgroundGradientColors[i] = colors.colorToHex(backgroundGradientColors[i]);
        }
      }

      // Create a rainbow.
      rainbow.setSpectrumByArray(backgroundGradientColors);
      // @todo, make the number of samples configurable.
      numberOfSamples = backgroundGradientColors.length * options.gradientSampleMultiplier;

      // Check each color.
      failureFound = false;
      for (i = 0; !failureFound && i < numberOfSamples; i++) {
        var testResult = colors.testElmBackground(options.algorithm, $this,
              '#' + rainbow.colourAt(i));

        if (!testResult) {
          buildCase(test, Case, element, 'failed', id, 'The background gradient makes the text unreadable');
          failureFound = true;
        }
      }

      // If no failure was found, the element passes for this case type.
      if (!failureFound) {
        buildCase(test, Case, element, 'passed', id, 'The background gradient does not affect readability');
      }
    }

    test.get('scope').forEach(function (scope) {

      var textNodes = document.evaluate(
        'descendant::text()[normalize-space()]',
        scope,
        null,
        window.XPathResult.ORDERED_NODE_ITERATOR_TYPE,
        null
      );
      var nodes = [];
      var textNode = textNodes.iterateNext();

      // Loop has to be separated. If we try to iterate and run testCandidates
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
        colorBackgroundGradientContrast(test, Case, options, $(element), element);
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
module.exports = ColorBackgroundGradientContrast;
