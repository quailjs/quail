/**
 * This particular test makes it impossible to impose a limit of one
 * expectation to each case. So we need to deal with multiple expectations.
 *
 * Maybe we could make this more generic, but really, a case should only ever
 * have one expectation, so this is, at the moment, a huge hack.
 *
 * @hereDeDragons.
 */
quail.components.resolveExpectation = function(element) {
  var $scope = $(element).closest('.quail-test');
  var expected = $scope.data('expected');
  var expectations = typeof expected === 'string' && expected.split('|');

  if (expectations.length > 1 && element.nodeType === 1) {
    var condition, $el;
    // Split apart the compound expectations.
    for (var i = 0, il = expectations.length; i < il; ++i) {
      condition = expectations[i].split(':');
      // Try to use the condition zero element as a selector.
      $el = $(condition[0], $scope);
      if ($el.length === 1 && element === $el.get(0)) {
        if (!condition[1] || condition[1] === 'ignore') {
          return;
        }
        else {
          // Retrieve the expectation for this element.
          expected = condition[1];
        }
      }
    }
  }
  // Otherwise the expectation is given as a simple value.
  return expected;
};
