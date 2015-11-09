var Case = require('Case');
var AcronymComponent = require('AcronymComponent');
var DocumentAbbrIsUsed = function (quail, test) {
  AcronymComponent(quail, test, Case, 'abbr');
};
module.exports = DocumentAbbrIsUsed;
