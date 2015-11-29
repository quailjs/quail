var Case = require('Case');
var DocumentStrictDocType = {
  run: function (test) {
    if (typeof document.doctype === 'undefined' ||
      !document.doctype ||
      document.doctype.systemId.search('strict') === -1) {
      test.add(Case({
        element: document,
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: document,
        status: 'passed'
      }));
    }
  },

  meta: {
    replace: 'this'
  }
};
module.exports = DocumentStrictDocType;
