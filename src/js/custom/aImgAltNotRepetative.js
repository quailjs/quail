quail.aImgAltNotRepetitive = function() {
  quail.html.find('a img[alt]').each(function() {
    if (quail.cleanString($(this).attr('alt')) === quail.cleanString($(this).parent('a').text())) {
      quail.testFails('aImgAltNotRepetitive', $(this).parent('a'));
    }
  });
};
