/**
 * Test callback for tests that look for script events
 *  (like a mouse event has a keyboard event as well).
 */
quail.components.event = function(testName, options) {
  var $items = (typeof options.selector === 'undefined') ?
                quail.html.find('*') :
                quail.html.find(options.selector);
  $items.each(function() {
    if(quail.components.hasEventListener($(this), options.searchEvent.replace('on', '')) &&
         (typeof options.correspondingEvent === 'undefined' ||
         !quail.components.hasEventListener($(this), options.correspondingEvent.replace('on', '')))) {
      quail.testFails(testName, $(this));
    }
  });
};