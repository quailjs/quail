quail.components.headingLevel = function (quail, test, Case, options) {
  var priorLevel = false;
  test.get('$scope').find(':header').each(function () {
    var level = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
    var element = this;
    if (priorLevel === options.headingLevel && level > priorLevel + 1) {
      test.add(Case({
        element: element,
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        status: 'passed'
      }));
    }
    priorLevel = level;
  });
};
