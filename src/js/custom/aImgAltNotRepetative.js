quail.aImgAltNotRepetative = function() {
  quail.html.find('a img[alt]').each(function() {
    if(quail.cleanString($(this).attr('alt')) === quail.cleanString($(this).parent('a').text())) {
      quail.testFails('aImgAltNotRepetative', $(this).parent('a'));
    }
  });
};
