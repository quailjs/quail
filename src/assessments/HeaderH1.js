var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH1 = {
  run: function (test) {
    HeadingLevelComponent(test, {
      headingLevel: 1
    });
  },

  meta: {
replace: 'this'
  }
};
module.exports = HeaderH1;
