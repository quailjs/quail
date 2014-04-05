/**
 * Test callback for tests that look for script events
 *  (like a mouse event has a keyboard event as well).
 */
quail.components.event = function(quail, test, Case, options) {
  var $items = (typeof options.options.selector === 'undefined') ?
                test.get('$scope').find('*') :
                test.get('$scope').find(options.options.selector);
  $items.each(function() {
    if (quail.components.hasEventListener($(this), options.options.searchEvent.replace('on', '')) &&
         (typeof options.options.correspondingEvent === 'undefined' ||
         !quail.components.hasEventListener($(this), options.options.correspondingEvent.replace('on', '')))) {
      test.add(Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected'),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected'),
        status: 'passed'
      }));
    }
  });
};
