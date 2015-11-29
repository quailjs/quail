var AcronymComponent = require('AcronymComponent');
var DocumentAcronymsHaveElement = {
  run: function (test) {
    AcronymComponent(test, 'acronym');
  },

  meta: {
replace: 'this'
  }
};
module.exports = DocumentAcronymsHaveElement;
