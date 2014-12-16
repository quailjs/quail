quail.documentIDsMustBeUnique = function(quail, test, Case) {
  test.get('$scope').each(function(){
    if($(this).children().length === 0) {
      test.add(Case({
        element: this,
        'status': 'inapplicable',
        expected: $(this).closest('.quail-test').data('expected')
      }));
    }
  });
  test.get('$scope').find(':not([id])').each(function() {
    test.add(Case({
      element: this,
      'status': 'inapplicable',
      expected: $(this).closest('.quail-test').data('expected')
    }));
  });
  test.get('$scope').each(function(){
    var ids = {};
    $(this).find('[id]').each(function() {
      var _case = Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this))
      });
      test.add(_case);
      if(typeof ids[$(this).attr('id')] === 'undefined' && Object.keys(ids).length === 0){
        _case.set({
          'status': 'inapplicable'
        });
        ids[$(this).attr('id')] = $(this).attr('id');
      }else if (typeof ids[$(this).attr('id')] === 'undefined') {
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
  });
};
