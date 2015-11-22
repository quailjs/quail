'use strict';

var Case = require('Case');
var AMustHaveTitle = function AMustHaveTitle(test) {
  this.get('$scope').each(function () {
    var links = $(this).find('a');

    links.each(function (i, link) {
      // Has a title attribute and that attribute has a value, then pass.
      var title = $(link).attr('title');
      if (typeof title === 'string' && title.length > 0) {
        test.add(Case({
          element: this,
          status: 'passed'
        }));
      }
      // Does not have a title attribute or the attribute does not have a value.
      else if (typeof title === 'undefined' || !title.length) {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        }
    });
  });
};
module.exports = AMustHaveTitle;