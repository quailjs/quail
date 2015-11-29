/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var EventComponent = require('EventComponent');

var ScriptOnclickRequiresOnKeypress = {
  run: function (test, options) {
    options = options || {
      selector: '[onclick]',
      correspondingEvent: 'onkeypress',
      searchEvent: 'onclick'
    };
    EventComponent(test, options);
  },

  meta: {
    replace: 'this'
  }
};
module.exports = ScriptOnclickRequiresOnKeypress;
