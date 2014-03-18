quail.doctypeProvided = function() {
  if ($(quail.html.get(0).doctype).length === 0 && !document.doctype) {
    quail.testFails('doctypeProvided', quail.html.find('html'));
  }
};
