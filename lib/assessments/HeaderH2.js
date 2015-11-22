'use strict';

var Case = require('Case');
var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH2 = function HeaderH2(test) {
  HeadingLevelComponent(quail, test, Case, {
    headingLevel: 2
  });
};
module.exports = HeaderH2;