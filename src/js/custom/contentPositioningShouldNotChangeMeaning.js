quail.contentPositioningShouldNotChangeMeaning = function(quail, test, Case) {
  //Look for absolute positioned elements that are being put into grids or columns
  var positions = ['top', 'left', 'right', 'bottom'];
  var coordinates = {};
  var failed = false;
  test.get('$scope').find('*:has(*:quailCss(position=absolute))').each(function() {
    coordinates = {top: {}, left: {}, right: {}, bottom: {}};
    failed = false;
    var $container = $(this);
    $container.find('h1, h2, h3, h4, h5, h6, p, blockquote, ol, li, ul, dd, dt').filter(':quailCss(position=absolute)').each(function() {
      for (var i = 0; i < positions.length; i++) {
        if (typeof $(this).css(positions[i]) !== 'undefined' && $(this).css(positions[i]) !== 'auto') {
          if (typeof coordinates[positions[i]][$(this).css(positions[i])] === 'undefined') {
            coordinates[positions[i]][$(this).css(positions[i])] = 0;
          }
          coordinates[positions[i]][$(this).css(positions[i])]++;
        }
      }
    });

    $.each(positions, function() {
      $.each(coordinates[this], function() {
        if (this > 2 && !failed) {
          failed = true;
          test.add(Case({
            element: $container.get(0),
            expected: $container.closest('.quail-test').data('expected'),
            status: 'failed'
          }));
        }
      });
    });
  });
};
