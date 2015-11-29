var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH4 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 4
    });
  },

  meta: {
    replace: 'this'
  }
};
module.exports = HeaderH4;
