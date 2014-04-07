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
