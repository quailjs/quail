quail.whiteSpaceNotUsedForFormatting = function(quail, test, Case) {
  test.get('$scope').find(quail.textSelector).each(function() {
    var _case = test.add(Case({
      element: this,
      expected: (function (element) {
        return quail.components.resolveExpectation(element);
      }(this))
    }));
    if ($(this).find('br').length === 0) {
      _case.set({status: 'passed'});
      return;
    }
    var lines = $(this).html().toLowerCase().split(/(<br\ ?\/?>)+/);
    var lineCount = 0;
    $.each(lines, function(index, line) {
      if (line.search(/(\s|\&nbsp;){2,}/g) !== -1) {
        lineCount++;
      }
    });
    if(lineCount > 1) {
      _case.set({status: 'failed'});
    }
    else {
      _case.set({status: 'cantTell'});
    }
  });
};
