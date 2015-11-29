var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH3 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 3
    });
  },

  meta: {
replace: 'this'
  }
};
module.exports = HeaderH3;
