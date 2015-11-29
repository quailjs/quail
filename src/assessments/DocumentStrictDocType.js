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
    testability: 1,
    title: {
      en: 'The page uses a strict doctype',
      nl: 'De pagina gebruikt een strikt doctype'
    },
    description: {
      en: 'The doctype of the page or document should be either an HTML or XHTML strict doctype.',
      nl: 'Het doctype van een pagina of document moet een HTML of XHTML strikt doctype zijn.'
    },
    guidelines: [

    ],
    tags: [
      'document',
      'doctype'
    ]
  }
};
module.exports = DocumentStrictDocType;
