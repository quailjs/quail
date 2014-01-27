quail.newWindowIsOpened = function() {

  var fenestrate = window.open;

  // Save a reference to the link that is clicked, so it can be passed to
  // quail.testFails() if window.open is called.
  var clicker;

  window.open = function () {
    quail.testFails('newWindowIsOpened', $(clicker));
  };

  quail.html.find('a').each(function () {
    // Save a reference to this clicked tag.
    clicker = this;
    $(this).trigger('click');
  });

  window.open = fenestrate;
};
