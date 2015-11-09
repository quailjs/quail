/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
'use strict';

var Case = require('Case');

var DocumentHasTitleElement = function DocumentHasTitleElement(quail, test) {

  var selector = 'head title';

  this.get('$scope').each(function () {
    var candidates = $(this).find(selector);
    if (candidates.length === 1) {
      test.add(Case({
        element: candidates.get(0),
        status: 'passed'
      }));
    } else if (candidates.length === 0) {
      test.add(Case({
        element: undefined,
        status: 'failed'
      }));
    } else if (candidates.length > 1) {
      candidates.each(function () {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      });
    }
  });
};
module.exports = DocumentHasTitleElement;