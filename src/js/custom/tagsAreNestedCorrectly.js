quail.tagsAreNestedCorrectly=function(quail, test, Case){

  quail.components.htmlSource.getHtml(function(html) {

    var validationResults = quail.components.htmlTagValidator(html);

    var _case = Case({
      // This is just for internal Quail testing. Get the first quail test element
      // and then its expected attribute value. This will return 'undefined' for
      // any other testing environment.
      expected: test.get('$scope').filter('.quail-test').eq(0).data('expected')
    });

    test.add(_case);

    // An error message is returned if a parsing error is found.
    if (validationResults) {
      _case.set({
        'status': 'failed',
        'html': validationResults
      });
    // Null is return if no parsing error is found; thus the test passes.
    } else {
      _case.set({
        'status': 'passed'
      });
    }
  });
};
