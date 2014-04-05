quail.components.headingLevel = function(quail, test, Case, options) {

  /**
   * This particular test makes it impossible to impose a limit of one
   * expectation to each case. So we need to deal with multiple expectations.
   *
   * Maybe we could make this more generic, but really, a case should only ever
   * have one expectation, so this is, at the moment, a huge hack.
   *
   * @hereDeDragons.
   */
  var resolveExpection = function(element) {
    var expected = $(element).closest('.quail-test').data('expected');
    var expectations = expected.split('|');

    if (expectations.length > 1 && element.nodeType === 1) {
      var conditions = {};
      var condition;
      // Split apart the compound expectations.
      for (var i = 0, il = expectations.length; i < il; ++i) {
        condition = expectations[i].split(':');
        conditions[condition[0].toUpperCase()] = condition[1];
      }
      // Retrieve the expectation for this element.
      expected = conditions[element.nodeName];
      // Return nothing if told to ignore or there is no expectation for this
      // node.
      if (!expected || expected === 'ignore') {
        return;
      }
    }
    // Otherwise the expectation is given as a simple value.
    return expected;
  };

  var priorLevel = false;
  test.get('$scope').find(':header').each(function() {
    var level = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
    var element = this;
    if (priorLevel === options.options.headingLevel && level > priorLevel + 1) {
      test.add(Case({
        element: element,
        // @todo, make the expected property retrievable through a callback so
        //   that we don't need to overload a test with this kind of logic.
        expected: (function (element) {
          return resolveExpection(element);
        }(element)),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        expected: (function (element) {
          return resolveExpection(element);
        }(element)),
        status: 'passed'
      }));
    }
    priorLevel = level;
  });
};
