/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
'use strict';

var LabelComponent = require('LabelComponent');

var PasswordHasLabel = function PasswordHasLabel(quail, test, Case) {
  var options = {
    selector: 'input[type="password"]'
  };
  LabelComponent(quail, test, Case, options);
};;
module.exports = PasswordHasLabel;