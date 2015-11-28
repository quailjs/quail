var Case = require('Case');
var AcronymComponent = require('AcronymComponent');
var DocumentAcronymsHaveElement = function (test) {
  AcronymComponent(test, 'acronym');
};
module.exports = DocumentAcronymsHaveElement;
