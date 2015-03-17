quail.embedHasAssociatedNoEmbed = function(quail, test, Case) {
  test.get('$scope').find('embed').each(function() {
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    _case.set({
      'status': ($(this).find('noembed').length || $(this).next().is('noembed')) ?
        'passed' :
        'failed'
    });
  });
};
