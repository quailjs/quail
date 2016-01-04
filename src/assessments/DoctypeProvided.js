var Case = require('Case');
var DoctypeProvided = {
  run: function (test) {
    test.get('scope').forEach((doc) => {
      if (!document.doctype) {
        test.add(Case({
          element: doc,
          status: 'failed'
        }));
      }
      else {
        test.add(Case({
          element: doc,
          status: 'passed'
        }));
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'The document should contain a valid \"doctype\" declaration',
      nl: 'Het document moet een geldige \"doctype\"-verklaring hebben'
    },
    description: {
      en: 'Each document must contain a valid doctype declaration.',
      nl: 'Ieder document moet een geldige doctype-verklaring hebben.'
    },
    guidelines: [

    ],
    tags: [
      'doctype'
    ]
  }
};
module.exports = DoctypeProvided;
