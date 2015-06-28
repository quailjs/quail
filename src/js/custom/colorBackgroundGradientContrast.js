quail.colorBackgroundGradientContrast = function (quail, test, Case, options) {

  var colors    = quail.components.color.colors;
  var buildCase = quail.components.color.buildCase;
  var id        = 'colorBackgroundGradientContrast';

  /**
   *
   */
  function colorBackgroundGradientContrast(test, Case, options, $this, element) {
    // Check if there's a background gradient using DOM.
    var failureFound, rainbow, numberOfSamples;
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
    /* global Rainbow */
    rainbow = new Rainbow();
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


  test.get('$scope').each(function () {

    var textNodes = document.evaluate('descendant::text()[normalize-space()]', this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var nodes     = [];
    var textNode  = textNodes.iterateNext();

    // Loop has to be separated. If we try to iterate and run testCandidates
    // the xpath thing will crash because document is being modified.
    while (textNode) {
      if (quail.components.color.textShouldBeTested(textNode)) {
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
};
