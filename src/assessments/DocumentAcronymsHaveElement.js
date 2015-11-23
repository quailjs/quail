var Case = require('Case');
var AcronymComponent = require('AcronymComponent');
var DocumentAcronymsHaveElement = function (test) {
  AcronymComponent(quail, test, Case, 'acronym');
};
module.exports = DocumentAcronymsHaveElement;
