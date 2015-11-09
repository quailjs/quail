var Case = require('Case');
var LabelMustBeUnique = function (quail, test) {
  var labels = {};
  test.get('$scope').find('label[for]').each(function () {
    if (typeof labels[$(this).attr('for')] === 'undefined') {
      labels[$(this).attr('for')] = 0;
    }
    labels[$(this).attr('for')]++;
  });
  test.get('$scope').find('label[for]').each(function () {
    var _case = Case({
      element: this,
      status: (labels[$(this).attr('for')] === 1) ?
        'passed' :
        'failed'
    });
    test.add(_case);
  });
};
module.exports = LabelMustBeUnique;
