/**
 * This particular test makes it impossible to impose a limit of one
 * expectation to each case. So we need to deal with multiple expectations.
 *
 * Maybe we could make this more generic, but really, a case should only ever
 * have one expectation, so this is, at the moment, a huge hack.
 *
 * @param DOM element
 *   The element currently being tested.
 * @param string caseID
 *   The test's ID for a Case. Sometimes a test will produce sub-types of cases
 *   that will be identified by a unique string.
 *
 * @return string|null
 *   The expected result: 'pass', 'fail', 'inapplicable'
 *
 * @hereDeDragons.
 */
quail.components.resolveExpectation = function(element, caseID) {
  var $scope = $(element).closest('.quail-test');
  var expected = $scope.data('expected');
  var result;
  // If no caseID is supplied, assume that the expected data attribute could
  // contain a simple, singular expectation.
  if (!caseID) {
    result = $scope.data('expected');
  }
  var expectations = typeof expected === 'string' && expected.split('|');
  // This might be a single case ID expectation.
  if (caseID && expectations.length === 0 && expected.indexOf(':') > -1) {
    expectations = [expected];
  }

  if (expectations.length > 0 && element.nodeType === 1) {
    var condition, $el;
    // Split apart the compound expectations.
    for (var i = 0, il = expectations.length; i < il; ++i) {
      condition = expectations[i].split(':');
      // If a caseID is supplied, assume the expect targets them.
      if (caseID) {
        if (condition[0] === caseID) {
          if (!condition[1] || condition[1] === 'ignore') {
            return;
          }
          else {
            // Retrieve the expectation for this element.
            result = condition[1];
          }
        }
      }
      // Try to use the condition zero element as a selector.
      else {
        $el = $(condition[0], $scope);
        if ($el.length === 1 && element === $el.get(0)) {
          if (!condition[1] || condition[1] === 'ignore') {
            return;
          }
          else {
            // Retrieve the expectation for this element.
            result = condition[1];
          }
        }
      }
    }
  }
  // Otherwise the expectation is given as a simple value.
  return result;
};
