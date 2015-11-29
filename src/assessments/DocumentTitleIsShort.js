var Case = require('Case');
var DocumentTitleIsShort = {
  run: function (test) {
    var $title = test.get('$scope').find('head title');
    test.add(Case({
      element: $title.get(0),
      status: $title.text().length > 150 ? 'failed' : 'passed'
    }));
  },

  meta: {
replace: 'this'
  }
};
module.exports = DocumentTitleIsShort;
