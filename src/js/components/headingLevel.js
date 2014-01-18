quail.components.headingLevel = function(testName, options) {
  var priorLevel = false;
  quail.html.find(':header').each(function() {
    var level = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
    if(priorLevel === options.headingLevel && level > priorLevel + 1) {
      quail.testFails(testName, $(this));
    }
    priorLevel = level;
  });
};
