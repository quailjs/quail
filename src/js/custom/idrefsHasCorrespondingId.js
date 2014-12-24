quail.idrefsHasCorrespondingId = function( quail, test, Case ) {

  function getAttribute($element){
    var attribute = [];
    var attributeList = ['headers', 'aria-controls', 'aria-describedby', 'aria-flowto', 'aria-labelledby', 'aria-owns'];

    $.each(attributeList, function(index, item){

      var attr =  $element.attr(item);

      if(typeof attr !== typeof undefined && attr !== false){
        attribute = attr;
        return;
      }
    });
    return attribute.split( /\s+/ );
  }

  test.get('$scope').each(function() {

      var testableElements = $(this).find(
        'td[headers], th[headers], [aria-controls], [aria-describedby], [aria-flowto], ' +
        '[aria-labelledby], [aria-owns]');

      if (testableElements.length === 0) {

        test.add(Case({
          element: this,
          expected: $(this).closest('.quail-test').data('expected'),
          status: 'inapplicable'
        }));
        return;
      } else {

        testableElements.each(function() {
          var element = this;
          var _case = test.add(Case({
            element: this,
            expected: $(this).closest('.quail-test').data('expected')
          }));

          var attributes = getAttribute($(element));
          var status = 'passed';

          $.each(attributes, function(index, item) {

            if (item !== "" && $('#' + item).length === 0) {
              status = 'failed';
              return;
            }
          });

          _case.set({
            'status': status
          });
        });
      }

    }
  );
};