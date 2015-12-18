/**
 * Test scriptOnFocusChangeBackgroundOrBorder.
 */
var Case = require('Case');

var ScriptOnFocusChangeBackgroundOrBorder = {
  run: function (test) {
    var buildCase = function (element, status, id, message) {
      test.add(Case({
        element: element,
        message: message,
        status: status
      }));
    };

    test.get('scope').find('input,button,a').each(function () {
      var $this = $(this);

      var noFocus = {
        background: $this.css('background'),
        border: $this.css('border')
      };

      $this.focus();

      // Blur and make sure all changes are reverted.
      $this.blur();
      if (noFocus.background !== $this.css('background') || noFocus.border !== $this.css('border')) {
        buildCase(this, 'failed', null, 'Using script to change the background color or border of the element with focus');
      }
      else {
        buildCase(this, 'passed', null, 'Using script to change the background color or border of the element with focus');
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Using script to change the background color or border of the element with focus'
    },
    description: {
      en: 'Using script to change the background color or border of the element with focus'
    },
    guidelines: {
      wcag: {
        '2.4.7': {
          techniques: [
            'SCR31'
          ]
        }
      }
    },
    tags: [
      'content'
    ]
  }
};
module.exports = ScriptOnFocusChangeBackgroundOrBorder;
