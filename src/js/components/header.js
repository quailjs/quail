quail.components.header = function(testName, options) {
  var current = parseInt(options.selector.substr(-1, 1), 10);
  var nextHeading = false;
  quail.html.find('h1, h2, h3, h4, h5, h6').each(function() {
    var number = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
    if(nextHeading && (number - 1 > current || number + 1 < current)) {
      quail.testFails(testName, $(this));
    }
    if(number === current) {
      nextHeading = $(this);
    }
    if(nextHeading && number !== current) {
      nextHeading = false;
    }
  });
};