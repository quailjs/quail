'use strict';

var AcronymComponent = require('AcronymComponent');
var DocumentAcronymsHaveElement = function DocumentAcronymsHaveElement(quail, test, Case) {
  AcronymComponent(quail, test, Case, 'acronym');
};
module.exports = DocumentAcronymsHaveElement;