quail.documentLangIsISO639Standard = function() {
  var language = quail.html.find('html').attr('lang');
  if(!language) {
    return;
  }
  if(quail.strings.languageCodes.indexOf(language) === -1) {
      quail.testFails('documentLangIsISO639Standard', quail.html.find('html'));
  }
};
