quail.documentIDsMustBeUnique = function(quail, test, Case) {

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

  var ids = {};
  test.get('$scope').find(':not([id])').each(function() {
    var _case = Case({
      element: this
    });
    test.add(_case);
    _case.set({
      'status': 'notApplicable',
      expected: $(this).closest('.quail-test').data('expected')
    });
  });
  test.get('$scope').find('[id]').each(function() {
    var _case = Case({
      element: this,
      expected: (function (element) {
        return resolveExpection(element);
      }(this))
    });
    test.add(_case);
    if (typeof ids[$(this).attr('id')] === 'undefined') {
      _case.set({
        'status': 'passed'
      });
      ids[$(this).attr('id')] = $(this).attr('id');
    }
    else {
      _case.set({
        'status': 'failed'
      });
    }
  });
};
