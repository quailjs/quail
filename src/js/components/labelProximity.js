/**
 * Tests that a label element is close (DOM-wise) to it's target form element.
 */
quail.components.labelProximity = function(testName, options) {
  quail.html.find(options.selector).each(function() {
    var $label = quail.html.find('label[for=' + $(this).attr('id') + ']').first();
    if(!$label.length) {
      quail.testFails(testName, $(this));
    }
    if(!$(this).parent().is($label.parent())) {
      quail.testFails(testName, $(this));
    }
  });
};