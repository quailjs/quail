var Case = require('Case');
var ColorComponent = require('ColorComponent');
var Rainbow = require('rainbowvis.js/rainbowvis.js');

var ColorElementBehindBackgroundGradientContrast = {
  run: function (test, options) {

    options = options || {};

    var colors = ColorComponent.colors;
    var buildCase = ColorComponent.buildCase;
    var id = 'colorElementBehindBackgroundGradientContrast';
    // Hard-coding this for now. Requires a way to pass options from the test
    // definitions down to the test functions.
    options.algorithm = 'wcag';
    options.gradientSampleMultiplier = 3;

    /**
     *
     */
    function colorElementBehindBackgroundGradientContrast (test, Case, options, $this, element) {
      // Check if there's a background gradient using element behind current element.
      var behindGradientColors;
      var failureFound;
      var rainbow = new Rainbow();
      // The option element is problematic.
      if (!$this.is('option')) {
        behindGradientColors = colors.getBehindElementBackgroundGradient($this);
      }

      if (!behindGradientColors) {
        return;
      }

      // Convert colors to hex notation.
      for (var i = 0; i < behindGradientColors.length; i++) {
        if (behindGradientColors[i].substr(0, 3) === 'rgb') {
          behindGradientColors[i] = colors.colorToHex(behindGradientColors[i]);
        }
      }

      // Create a rainbow.
      rainbow.setSpectrumByArray(behindGradientColors);
      var numberOfSamples = behindGradientColors.length * options.gradientSampleMultiplier;

      // Check each color.
      failureFound = false;
      for (i = 0; !failureFound && i < numberOfSamples; i++) {
        failureFound = !colors.testElmBackground(options.algorithm, $this,
              '#' + rainbow.colourAt(i));
      }

      // If no failure was found, the element passes for this case type.
      if (failureFound) {
        buildCase(test, Case, element, 'failed', id, 'The background gradient of the element behind this element makes the text unreadable');
      }
      else {
        buildCase(test, Case, element, 'passed', id, 'The background gradient of the element behind this element does not affect readability');
      }
    }

    test.get('$scope').each(function () {
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
        colorElementBehindBackgroundGradientContrast(test, Case, options, $(element), element);
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
module.exports = ColorElementBehindBackgroundGradientContrast;
