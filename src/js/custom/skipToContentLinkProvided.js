/**globals console:true */
quail.skipToContentLinkProvided = function(quail, test, Case) {
  var skipLinkFound = false;
  var _case = Case({
    element: test.get('$scope').get(0),
    expected: test.get('$scope').data('expected')
  });
  test.add(_case);
  test.get('$scope').find('a[href*="#"]').each(function() {
    var $link = $(this);
    $.each(quail.strings.skipContent, function() {
      if ($link.text().search(this) > -1 &&
          test.get('$scope').find('#' + $link.attr('href').split('#').pop()).length
          ) {
        $link.focus();
        if ($link.is(':visible') && $link.css('visibility') !== 'hidden') {
          skipLinkFound = true;
          _case.set({
            'status': 'passed'
          });
          return;
        }
        $link.blur();
      }
    });
  });
  if (!skipLinkFound) {
    _case.set({
      'status': 'failed'
    });
  }
};
