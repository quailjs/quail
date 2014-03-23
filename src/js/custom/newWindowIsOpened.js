quail.newWindowIsOpened = function(quail, test, Case) {

  var fenestrate = window.open;

  // Save a reference to the link that is clicked, so it can be passed to
  // quail.testFails() if window.open is called.
  var clicker;

  window.open = function (event) {
    test.each(function (index, _case) {
      var href = _case.get('element').href;
      if (href.indexOf(event) > -1) {
        _case.set('status', 'failed');
      }
    });
  };

  quail.html.find('a').each(function () {
    // Save a reference to this clicked tag.
    clicker = this;
    test.add(Case({
      element: this
    }));
    $(this).trigger('click');
  });

  window.open = fenestrate;
};
