var Case = require('Case');
var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH2 = function (quail, test) {
  HeadingLevelComponent(quail, test, Case, {
    headingLevel: 2
  });
};
module.exports = HeaderH2;
