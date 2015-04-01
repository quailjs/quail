quail.colorBackgroundImageContrast = function (quail, test, Case, options) {

  var colors    = quail.components.color.colors;
  var buildCase =  quail.components.color.buildCase;
  var id        = 'colorBackgroundImageContrast';

  /**
   *
   */
  function colorBackgroundImageContrast(test, Case, options, $this, element) {
    // Check if there's a backgroundImage using DOM.
    var backgroundImage = colors.getBackgroundImage($this);
    if (!backgroundImage) {
      return;
    }

    var img = document.createElement('img');
    img.crossOrigin = "Anonymous";

    // Get average color of the background image. The image must first load
    // before information about it is available to the DOM.
    img.onload = function () {
      var averageColorBackgroundImage = colors.getAverageRGB(img);
      var testResult = colors.testElmBackground(options.algorithm, $this,
            averageColorBackgroundImage);

      // Build a case.
      if (!testResult) {
        buildCase(test, Case, element, 'failed', id, 'The element\'s background image makes the text unreadable');

      } else {
        buildCase(test, Case, element, 'passed', id, 'The element\'s background image does not affect readability');
      }
    };

    img.onerror = img.onabort = function () {
      buildCase(test, Case, element, 'cantTell', id, 'The element\'s background image could not be loaded (' + backgroundImage + ')');
    };

    // Load the image.
    img.src = backgroundImage;
  }


  test.get('$scope').each(function () {
    var textNodes = document.evaluate('descendant::text()[normalize-space()]', this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var nodes = [];
    var textNode = textNodes.iterateNext();

    // Loop has to be separated. If we try to iterate and rund testCandidates
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
      colorBackgroundImageContrast(test, Case, options, $(element), element);
    });
  });
};
