quail.documentStrictDocType = function() {
  if(!$(quail.html.get(0).doctype).length ||
     quail.html.get(0).doctype.systemId.indexOf('strict') === -1) {
    quail.testFails('documentStrictDocType', quail.html.find('html'));
  }
};
