'use strict';

var ImgMapAreasHaveDuplicateLink = function ImgMapAreasHaveDuplicateLink(quail, test, Case) {
  var links = {};
  test.get('$scope').find('a').each(function () {
    links[$(this).attr('href')] = $(this).attr('href');
  });
  test.get('$scope').find('img[usemap]').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    var $image = $(this);
    var $map = test.get('$scope').find($image.attr('usemap'));
    if (!$map.length) {
      $map = test.get('$scope').find('map[name="' + $image.attr('usemap').replace('#', '') + '"]');
    }
    if ($map.length) {
      var failed = false;
      $map.find('area').each(function () {
        if (typeof links[$(this).attr('href')] === 'undefined') {
          failed = true;
        }
      });
      _case.set({
        status: failed ? 'failed' : 'passed'
      });
    } else {
      _case.set({
        status: 'inapplicable'
      });
    }
  });
};;
module.exports = ImgMapAreasHaveDuplicateLink;