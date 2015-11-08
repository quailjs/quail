'use strict';

var DoctypeProvided = function DoctypeProvided(quail, test, Case) {
  var doc = test.get('$scope').get(0);
  if ($(doc.doctype).length === 0 && !document.doctype) {
    test.add(Case({
      element: doc,
      status: 'failed'
    }));
  } else {
    test.add(Case({
      element: doc,
      status: 'passed'
    }));
  }
};;
module.exports = DoctypeProvided;