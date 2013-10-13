/**
 * Test callback for tests that look for script events
 *  (like a mouse event has a keyboard event as well).
 */
quail.scriptEventTest = function(testName, options) {
  var $items = (typeof options.selector === 'undefined') ?
                quail.html.find('body').find('*') :
                quail.html.find(options.selector);
  $items.each(function() {
    var $element = $(this).get(0);
    if($(this).attr(options.searchEvent)) {
      if(typeof options.correspondingEvent === 'undefined' ||
         !$(this).attr(options.correspondingEvent)) {
        quail.testFails(testName, $(this));
      }
    }
    else {
      if(quail.hasEventListener($element, options.searchEvent.replace('on', '')) &&
         (typeof options.correspondingEvent === 'undefined' ||
         !quail.hasEventListener($element, options.correspondingEvent.replace('on', '')))) {
        quail.testFails(testName, $(this));
      }
    }
  });
};