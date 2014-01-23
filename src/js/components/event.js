/**
 * Test callback for tests that look for script events
 *  (like a mouse event has a keyboard event as well).
 */
quail.components.event = function(testName, options) {
  var $items = (typeof options.options.selector === 'undefined') ?
                quail.html.find('*') :
                quail.html.find(options.options.selector);
  $items.each(function() {
    if(quail.components.hasEventListener($(this), options.options.searchEvent.replace('on', '')) &&
         (typeof options.options.correspondingEvent === 'undefined' ||
         !quail.components.hasEventListener($(this), options.options.correspondingEvent.replace('on', '')))) {
      quail.testFails(testName, $(this));
    }
  });
};