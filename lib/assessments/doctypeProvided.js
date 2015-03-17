quail.doctypeProvided = function(quail, test, Case) {
  var doc = test.get('$scope').get(0);
  if ($(doc.doctype).length === 0 && !document.doctype) {
    test.add(Case({
      element: doc,
      expected: 'fail',
      status: 'failed'
    }));
  }
  else {
    test.add(Case({
      element: doc,
      expected: 'pass',
      status: 'passed'
    }));
  }
};
