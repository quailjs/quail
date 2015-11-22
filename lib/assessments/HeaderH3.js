'use strict';

var Case = require('Case');
var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH3 = function HeaderH3(test) {
  HeadingLevelComponent(quail, test, Case, {
    headingLevel: 3
  });
};
module.exports = HeaderH3;