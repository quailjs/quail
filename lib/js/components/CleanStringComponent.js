'use strict';

var CleanStringComponent = function CleanStringComponent(string) {
  return string.toLowerCase().replace(/^\s\s*/, '');
};

module.exports = CleanStringComponent;