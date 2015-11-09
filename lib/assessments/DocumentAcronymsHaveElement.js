'use strict';

var Case = require('Case');
var AcronymComponent = require('AcronymComponent');
var DocumentAcronymsHaveElement = function DocumentAcronymsHaveElement(quail, test) {
  AcronymComponent(quail, test, Case, 'acronym');
};
module.exports = DocumentAcronymsHaveElement;