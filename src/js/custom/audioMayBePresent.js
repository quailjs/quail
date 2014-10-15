quail.videoMayBePresent=function(quail, test, Case){

  var testableElements = test.get('$scope').find('video object iframe');

  if(testableElements.length === 0){
    var _case=Case({
      element: this,
      status: 'inapplicable',
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
  }

  test.get('$scope').find('video object').each(function(){
    var _case=Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });

    test.add(_case);
  });
};
