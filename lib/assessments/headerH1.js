'use strict';

var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH1 = function HeaderH1(quail, test, Case) {
  HeadingLevelComponent(quail, test, Case, {
    headingLevel: 1
  });
};
module.exports = HeaderH1;