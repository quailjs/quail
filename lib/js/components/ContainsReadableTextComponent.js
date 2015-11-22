'use strict';

var IsUnreadable = require('IsUnreadable');
var ContainsReadableTextComponent = function ContainsReadableTextComponent(element, children) {
  element = element.clone();
  element.find('option').remove();
  if (!IsUnreadable(element.text())) {
    return true;
  }
  if (!IsUnreadable(element.attr('alt'))) {
    return true;
  }
  if (children) {
    var readable = false;
    element.find('*').each(function () {
      if (ContainsReadableTextComponent($(this), true)) {
        readable = true;
      }
    });
    if (readable) {
      return true;
    }
  }
  return false;
};

module.exports = ContainsReadableTextComponent;