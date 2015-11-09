var Case = require('Case');
var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH4 = function (quail, test) {
  HeadingLevelComponent(quail, test, Case, {
    headingLevel: 4
  });
};
module.exports = HeaderH4;
