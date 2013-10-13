quail.documentLangIsISO639Standard = function() {
  var languages = quail.loadString('language_codes');
  var language = quail.html.find('html').attr('lang');
  if(!language) {
    return;
  }
  if(languages.indexOf(language) === -1) {
      quail.testFails('documentLangIsISO639Standard', quail.html.find('html'));
  }
};
