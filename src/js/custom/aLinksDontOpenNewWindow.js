quail.aLinksDontOpenNewWindow = function(quail, test, Case) {
  // Links without a target attribute pass.
  test.get('$scope').find('a').not('[target=_new], [target=_blank]').each(function () {
    test.add(Case({
      element: this,
      'expected': $(this).closest('.quail-test').data('expected'),
      'status': 'passed'
    }));
  });
  // Links with a target attribute pass if the link text indicates that the
  // link will open a new window.
  test.get('$scope').find('a[target=_new], a[target=_blank]').each(function() {
    var $link = $(this);
    var passes = false;
    var i = 0;
    var text = $link.text() + ' ' + $link.attr('title');
    var phrase = '';
    // Test the link text against strings the indicate the link will open
    // in a new window.
    do {
      phrase = quail.strings.newWindow[i];
      if (text.search(phrase) > -1) {
        passes = true;
      }
      ++i;

    } while (!passes && i < quail.strings.newWindow.length);
    // Build a Case.
    if (passes) {
      test.add(Case({
        element: this,
        'expected': $link.closest('.quail-test').data('expected'),
        'status': 'passed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        'expected': $link.closest('.quail-test').data('expected'),
        'status': 'failed'
      }));
    }
  });
};
