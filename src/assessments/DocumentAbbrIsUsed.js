var AcronymComponent = require('AcronymComponent');
var DocumentAbbrIsUsed = {
  run: function (test) {
    AcronymComponent(test, 'abbr');
  },

  meta: {
    replace: 'this'
  }
};
module.exports = DocumentAbbrIsUsed;
