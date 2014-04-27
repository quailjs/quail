quail.components.headingLevel = function(quail, test, Case, options) {
  var priorLevel = false;
  test.get('$scope').find(':header').each(function() {
    var level = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
    var element = this;
    if (priorLevel === options.headingLevel && level > priorLevel + 1) {
      test.add(Case({
        element: element,
        // @todo, make the expected property retrievable through a callback so
        //   that we don't need to overload a test with this kind of logic.
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(element)),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(element)),
        status: 'passed'
      }));
    }
    priorLevel = level;
  });
};
