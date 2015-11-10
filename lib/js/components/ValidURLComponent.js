/**
 * Helper function to determine if a given URL is even valid.
 */
'use strict';

var ValidURLComponent = function ValidURLComponent(url) {
  return url.search(' ') === -1;
};

module.exports = ValidURLComponent;