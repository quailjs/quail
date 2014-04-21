quail.formWithRequiredLabel = function(quail, test, Case) {
  var redundant = quail.strings.redundant;
  var lastStyle, currentStyle = false;
  redundant.required[redundant.required.indexOf('*')] = /\*/g;
  test.get('$scope').each(function () {
    var $local = $(this);
    $local.find('label').each(function() {
      var text = $(this).text().toLowerCase();
      var $label = $(this);
      var _case = test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this))
      }));
      for (var word in redundant.required) {
        if (text.search(word) >= 0 && !test.get('$scope').find('#' + $label.attr('for')).attr('aria-required')) {
          _case.set({
            'status': 'failed'
          });
        }
      }
      currentStyle = $label.css('color') + $label.css('font-weight') + $label.css('background-color');
      if (lastStyle && currentStyle !== lastStyle) {
        _case.set({
          'status': 'failed'
        });
      }
      lastStyle = currentStyle;
      if (typeof _case.get('status') === 'undefined') {
        _case.set({
          'status': 'passed'
        });
      }
    });
  });
};
