var Case = require('Case');
var DOM = require('DOM');
var HeadersAttrRefersToATableCell = {
  run: function (test) {
    // Table cell headers without referred ids
    test.get('scope').find('table').each(function () {
      var self = this;
      var _case = Case();
      test.add(_case);
      var elmHeaders = DOM.scry('th[headers], td[headers]', self);

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
    testability: 1,
    title: {
      en: 'Table cell headers attrtibutes must within the same table have an associated data cell with the same id',
      nl: 'Tabel cellen met een headers attribuut moeten binnen dezelfde tabel een overeenkomende data cel hebben in het id attribuut dezelfde waarde'
    },
    description: {
      en: '',
      nl: ''
    },
    guidelines: [

    ],
    tags: [
      'headers',
      'td',
      'th'
    ]
  }
};
module.exports = HeadersAttrRefersToATableCell;
