/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnmousemove = {
  run: function (test, options) {
    options = options || {
      selector: '[onmousemove]',
      correspondingEvent: 'onkeypress',
      searchEvent: 'onmousemove'
    };
    EventComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = ScriptOnmousemove;
