var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH2 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 2
    });
  },

  meta: {
    replace: 'this'
  }
};
module.exports = HeaderH2;
