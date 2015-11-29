var IsDataTableComponent = require('IsDataTableComponent');
var Case = require('Case');
var IsUnreadable = require('IsUnreadable');
var TableLayoutHasNoSummary = {
  run: function (test) {
    test.get('$scope').each(function () {
      var $local = $(this);
      $local.find('table[summary]').each(function () {
        var _case = test.add(Case({
          element: this
        }));
        if (!IsDataTableComponent($(this)) && !IsUnreadable($(this).attr('summary'))) {
          _case.set({status: 'failed'});
        }
        else {
          _case.set({status: 'passed'});
        }
      });
    });
  },

  meta: {
    replace: 'this'
  }
};
module.exports = TableLayoutHasNoSummary;
