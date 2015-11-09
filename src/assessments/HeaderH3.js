var Case = require('Case');
var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH3 = function (quail, test) {
  HeadingLevelComponent(quail, test, Case, {
    headingLevel: 3
  });
};
module.exports = HeaderH3;
