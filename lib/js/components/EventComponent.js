/**
 * Test callback for tests that look for script events
 *  (like a mouse event has a keyboard event as well).
 */
'use strict';

var HasEventListenerComponent = require('HasEventListenerComponent');
var $ = require('jquery/dist/jquery');

var EventComponent = function EventComponent(quail, test, Case, options) {
  var $scope = test.get('$scope');
  var $items = options.selector && $scope.find(options.selector);
  // Bail if nothing was found.
  if ($items.length === 0) {
    test.add(Case({
      element: $scope.get(),
      status: 'inapplicable'
    }));
    return;
  }
  var searchEvent = options.searchEvent || '';
  var correspondingEvent = options.correspondingEvent || '';
  $items.each(function () {
    var eventName = searchEvent.replace('on', '');
    var hasOnListener = HasEventListenerComponent($(this), eventName);
    // Determine if the element has jQuery listeners for the event.
    var jqevents;
    if ($._data) {
      jqevents = $._data(this, 'events');
    }
    var hasjQueryOnListener = jqevents && jqevents[eventName] && !!jqevents[eventName].length;
    var hasCorrespondingEvent = !!correspondingEvent.length;
    var hasSpecificCorrespondingEvent = HasEventListenerComponent($(this), correspondingEvent.replace('on', ''));
    var _case = test.add(Case({
      element: this
    }));
    if ((hasOnListener || hasjQueryOnListener) && (!hasCorrespondingEvent || !hasSpecificCorrespondingEvent)) {
      _case.set({
        status: 'failed'
      });
    } else {
      _case.set({
        status: 'passed'
      });
    }
  });
};
module.exports = EventComponent;