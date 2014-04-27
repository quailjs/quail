/**
 * Test callback for tests that look for script events
 *  (like a mouse event has a keyboard event as well).
 */
quail.components.event = function(quail, test, Case, options) {
  var $scope = test.get('$scope');
  var $items = options.selector && $scope.find(options.selector) || $scope.find('*');
  var searchEvent = options.searchEvent || '';
  var correspondingEvent = options.correspondingEvent || '';
  $items.each(function() {
    var eventName = searchEvent.replace('on', '');
    var hasOnListener = quail.components.hasEventListener($(this), eventName);
    // Determine if the element has jQuery listeners for the event.
    var jqevents;
    if ($._data) {
      jqevents = $._data(this, 'events');
    }
    var hasjQueryOnListener = jqevents && jqevents[eventName] && !!jqevents[eventName].length;
    var hasCorrespondingEvent = !!correspondingEvent.length;
    var hasSpecificCorrespondingEvent = quail.components.hasEventListener($(this), correspondingEvent.replace('on', ''));
    var expected = $(this).closest('.quail-test').data('expected');
    var _case = test.add(Case({
      element: this,
      expected: expected
    }));
    if ((hasOnListener || hasjQueryOnListener) && (!hasCorrespondingEvent || !hasSpecificCorrespondingEvent)) {
      _case.set({status: 'failed'});
    }
    else {
      _case.set({status: 'passed'});
    }
  });
};
