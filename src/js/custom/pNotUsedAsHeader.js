quail.pNotUsedAsHeader = function(quail, test, Case) {
  var priorStyle = { };
  test.get('$scope').find('p').each(function() {
    var _case = Case({
      element : this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    if ($(this).text().search('.') >= 1) {
      _case.set({
        'status': 'inapplicable'
      });
    }
    var failed = false;
    if ($(this).text().search('.') < 1) {
      var $paragraph = $(this);
      $.each(quail.suspectPHeaderTags, function(index, tag) {
        if ($paragraph.find(tag).length) {
          $paragraph.find(tag).each(function() {
            if ($(this).text().trim() === $paragraph.text().trim()) {
              _case.set({
                'status': 'failed'
              });
              failed = true;
            }
          });
        }
      });
      $.each(quail.suspectPCSSStyles, function(index, style) {
        if (typeof priorStyle[style] !== 'undefined' &&
           priorStyle[style] !== $paragraph.css(style)) {
          _case.set({
            'status': 'failed'
          });
          failed = true;
        }
        priorStyle[style] = $paragraph.css(style);
      });
      if ($paragraph.css('font-weight') === 'bold') {
        _case.set({
          'status': 'failed'
        });
        failed = true;
      }
    }
    if (!failed) {
      _case.set({
        'status': 'passed'
      });
    }
  });
};
