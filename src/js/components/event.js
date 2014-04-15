/**
 * Test callback for tests that look for script events
 *  (like a mouse event has a keyboard event as well).
 */
quail.components.event = function(quail, test, Case, options) {
  // Ugly.
  options = options && options.options || {};
  var $scope = test.get('$scope');
  var $items = options.selector && $scope.find(options.selector) || $scope.find('*');
  var searchEvent = options.searchEvent || '';
  var correspondingEvent = options.correspondingEvent || '';
  $items.each(function() {
    var hasOnListener = quail.components.hasEventListener($(this), searchEvent.replace('on', ''));
    var hasCorrespondingEvent = !!correspondingEvent.length;
    var hasSpecificCorrespondingEvent = quail.components.hasEventListener($(this), correspondingEvent.replace('on', ''));
    var expected = $(this).closest('.quail-test').data('expected');
    var _case = test.add(Case({
      element: this,
      expected: expected
    }));
    if (hasOnListener && (!hasCorrespondingEvent || !hasSpecificCorrespondingEvent)) {
      _case.set({status: 'failed'});
    }
    else {
      _case.set({status: 'passed'});
    }
  });
};
