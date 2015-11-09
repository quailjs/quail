var Case = require('Case');
var DocumentTitleIsShort = function (quail, test) {
  var $title = test.get('$scope').find('head title');
  test.add(Case({
    element: $title.get(0),
    status: $title.text().length > 150 ? 'failed' : 'passed'
  }));
};
module.exports = DocumentTitleIsShort;
