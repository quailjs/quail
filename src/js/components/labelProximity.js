/**
 * Tests that a label element is close (DOM-wise) to it's target form element.
 */
quail.components.labelProximity = function(quail, test, Case, options) {
  var $scope = test.get('$scope');
  $scope.find(options.selector).each(function() {
    var $label = $scope.find('label[for=' + $(this).attr('id') + ']').first();
    if (!$label.length) {
      test.add(Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected'),
        status: 'failed'
      }));
    }
    else if (!$(this).parent().is($label.parent())) {
      test.add(Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected'),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected'),
        status: 'passed'
      }));
    }
  });
};
