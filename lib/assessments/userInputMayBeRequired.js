quail.userInputMayBeRequired=function(quail, test, Case){
  test.get('$scope').each(function(){

    var _case=Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    var forms = $(this).find('form');
    var formInputs = 0;
    var inputsOutsideForm = $(this).find('input:not(form input, [type=button],[type=reset],[type=image],[type=submit],[type=hidden])');

    forms.each(function(){
      var inputs=$(this).find('input:not([type=button],[type=reset],[type=image],[type=submit],[type=hidden])');
      if (inputs.length > 1) {
        formInputs = inputs.length;
      }
    });

    if(formInputs > 0){
      _case.set({
        'status': 'cantTell'
      });
      return;
    }

    if(inputsOutsideForm.length > 1) {
      _case.set({
        'status': 'cantTell'
      });
      return;
    }

    _case.set({
      'status': 'inapplicable'
    });

  });
};
