/**
 * Helper function to determine if a string of text is even readable.
 * @todo - This will be added to in the future... we should also include
 * phonetic tests.
 */
'use strict';

var IsUnreadable = function IsUnreadable(text) {
  if (typeof text !== 'string') {
    return true;
  }
  return text.trim().length ? false : true;
};

module.exports = IsUnreadable;