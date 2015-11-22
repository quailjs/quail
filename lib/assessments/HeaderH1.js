'use strict';

var Case = require('Case');
var HeadingLevelComponent = require('HeadingLevelComponent');
var HeaderH1 = function HeaderH1(test) {
  HeadingLevelComponent(quail, test, Case, {
    headingLevel: 1
  });
};
module.exports = HeaderH1;