quail.imgAltTextNotRedundant = function() {
  var altText = {};
  quail.html.find('img[alt]').each(function() {
    if(typeof altText[$(this).attr('alt')] === 'undefined') {
      altText[$(this).attr('alt')] = $(this).attr('src');
    }
    else {
      if(altText[$(this).attr('alt')] !== $(this).attr('src')) {
        quail.testFails('imgAltTextNotRedundant', $(this));
      }
    }
  });
};
