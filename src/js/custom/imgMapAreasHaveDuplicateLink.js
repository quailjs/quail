quail.imgMapAreasHaveDuplicateLink = function() {
  var links = { };
  quail.html.find('a').each(function() {
    links[$(this).attr('href')] = $(this).attr('href');
  });
  quail.html.find('img[usemap]').each(function() {
    var $image = $(this);
    var $map = quail.html.find($image.attr('usemap'));
    if(!$map.length) {
      $map = quail.html.find('map[name="' + $image.attr('usemap').replace('#', '') + '"]');
    }
    if($map.length) {
      $map.find('area').each(function() {
        if(typeof links[$(this).attr('href')] === 'undefined') {
          quail.testFails('imgMapAreasHaveDuplicateLink', $image);
        }
      });
    }
  });
};
