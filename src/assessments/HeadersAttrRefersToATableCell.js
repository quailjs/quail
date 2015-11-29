var Case = require('Case');
var HeadersAttrRefersToATableCell = {
  run: function (test) {
    // Table cell headers without referred ids
    test.get('$scope').find('table').each(function () {
      var self = this;
      var _case = Case();
      test.add(_case);
      var elmHeaders = $(self).find('th[headers], td[headers]');

      if (elmHeaders.length === 0) {
        _case.set({
          status: 'inapplicable'
        });
        return;
      }
      else {
        elmHeaders.each(function () {
          var that = this;
          var headers = $(this).attr('headers').split(/\s+/);
          $.each(headers, function (index, item) {
            if (item === '' || $(self).find('th#' + item + ',td#' + item).length > 0) {
              _case.set({
                element: that,
                status: 'passed'
              });
              return;
            }
            else {
              _case.set({
                element: that,
                status: 'failed'
              });
              return;
            }
          });
        });
      }
    });
  },

  meta: {
replace: 'this'
  }
};
module.exports = HeadersAttrRefersToATableCell;
