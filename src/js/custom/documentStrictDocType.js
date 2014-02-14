quail.documentStrictDocType = function() {
  if(typeof document.doctype === 'undefined' ||
    !document.doctype ||
    document.doctype.systemId.search('strict') === -1) {
    quail.testFails('documentStrictDocType', quail.html.find('html'));
  }
};
