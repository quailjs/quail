/**
 * Test scriptOnFocusChangeBackgroundOrBorder.
 */
quail.scriptOnFocusChangeBackgroundOrBorder = function(quail, test, Case) {
  var buildCase = function (element, status, id, message) {
    test.add(Case({
      element: element,
      expected: (function (element, id) {
        return quail.components.resolveExpectation(element, id);
      }(element, id)),
      message: message,
      status: status
    }));
  };

  test.get('$scope').find('input,button,a').each(function() {
    var $this = $(this);

    var noFocus = {
      background: $this.css('background'),
      border: $this.css('border')
    };

    $this.focus();
    /*
    var withFocus = {
      background: $this.css('background'),
      border: $this.css('border')
    };*/

    // Blur and make sure all changes are reverted.
    $this.blur();
    if (noFocus.background !== $this.css('background') ||
        noFocus.border !== $this.css('border')) {
      buildCase($this, 'failed', null, 'Using script to change the background color or border of the element with focus');
    }
    else {
      buildCase($this, 'passed', null, 'Using script to change the background color or border of the element with focus');
    }

  });

};
