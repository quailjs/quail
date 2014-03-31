quail.aAdjacentWithSameResourceShouldBeCombined = function(quail, test, Case) {

  var $applicableElements = test.get('$scope').find('a');

  test.get('$scope').find('a').each(function() {
    // Find all of the <a> tags that are not followed or preceded
    // by another <a> tag. These are not applicable.
    var $this = $(this);
    if (!$this.prev('a').length && !$this.next('a').length) {
      var _case = Case({
        element: this
      });
      test.add(_case);
      _case.set({
        'status': 'notApplicable',
        expected: $(this).closest('.quail-test').data('expected')
      });
      $applicableElements = $applicableElements.not(this);
    }
  });

  $applicableElements
    .filter(function() {
      return $(this).next('a').length;
    }).each(function() {
      var _case = Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected')
      });
      test.add(_case);
      // Adjacent <a> tags that point to the same resource fail.
      if ($(this).attr('href') === $(this).next('a').attr('href')) {
        _case.set({
          'status': 'failed'
        });
      }
      // Adjacent <a> tags that point to different resources pass.
      else {
        _case.set({
          'status': 'passed'
        });
      }
    });
};
