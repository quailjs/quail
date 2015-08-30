/**globals console:true */
'use strict';

quail.skipToContentLinkProvided = function (quail, test, Case) {
  test.get('$scope').each(function () {
    var $local = $(this);
    var skipLinkFound = false;

    $local.find('a[href*="#"]').each(function () {
      if (skipLinkFound) {
        return;
      }
      var $link = $(this);

      var fragment = $link.attr('href').split('#').pop();
      var $target = $local.find('#' + fragment);
      var strs = quail.strings.skipContent.slice();
      while (!skipLinkFound && strs.length) {
        var str = strs.pop();
        if ($link.text().search(str) > -1 && $target.length) {
          $link.focus();
          if ($link.is(':visible') && $link.css('visibility') !== 'hidden') {
            skipLinkFound = true;
            test.add(Case({
              element: $link.get(0),
              status: 'passed'
            }));
            return;
          }
          $link.blur();
        }
      }
    });
    if (!skipLinkFound) {
      test.add(Case({
        status: 'failed'
      }));
    }
  });
};