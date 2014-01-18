quail.components.header = function(testName, options) {
  var headingLevel = parseInt(options.selector.substr(-1, 1), 10);
  var priorLevel = false;
  quail.html.find('h1, h2, h3, h4, h5, h6').each(function() {
    var level = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
    if(priorLevel && (level === priorLevel || level > priorLevel + 1)) {
      quail.testFails(testName, $(this));
    }
    priorLevel = level;
  });
};
