quail.tagsAreNestedCorrectly = function (quail, test, Case) {

  quail.components.htmlSource.getHtml(function (html) {

    var validationResults = quail.components.htmlTagValidator(html);

    var _case = Case();

    test.add(_case);

    // An error message is returned if a parsing error is found.
    if (validationResults) {
      _case.set({
        status: 'failed',
        html: validationResults
      });
    }
    // Null is return if no parsing error is found; thus the test passes.
    else {
      _case.set({
        status: 'passed'
      });
    }
  });
};
