quail.documentStrictDocType = function(quail, test, Case) {
  if (typeof document.doctype === 'undefined' ||
    !document.doctype ||
    document.doctype.systemId.search('strict') === -1) {
    test.add(Case({
      element: document,
      expected: test.get('$scope').data('expected'),
      status: 'failed'
    }));
  }
  else {
    test.add(Case({
      element: document,
      expected: test.get('$scope').data('expected'),
      status: 'passed'
    }));
  }
};
