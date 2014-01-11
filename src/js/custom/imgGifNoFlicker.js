quail.imgGifNoFlicker = function() {
  quail.html.find('img[src$=".gif"]').each(function() {
    var $image = $(this);
    $.ajax({url      : $image.attr('src'),
            async    : false,
            dataType : 'text',
            success  : function(data) {
              if(data.search('NETSCAPE2.0') !== -1) {
                quail.testFails('imgGifNoFlicker', $image);
              }
    }});
  });
};
