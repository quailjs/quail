quail.pNotUsedAsHeader = function(quail, test, Case) {
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
    // Look for any indication that the paragraph contains at least a full sentence
    if ($(this).text().search(/[.!:;]/) < 1) {
      var $paragraph = $(this),
        priorParagraph = $paragraph.prev('p');
      // Checking if any of suspectPHeaderTags has exact the same text as a paragraph.
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

      // Checking if previous paragraph has a different values for style properties given in quail.suspectPCSSStyles.
      if ( priorParagraph.length ) {
        $.each(quail.suspectPCSSStyles, function(index, cssProperty) {
          if ( $paragraph.css(cssProperty) !== priorParagraph.css(cssProperty) ) {
            _case.set({
              'status': 'failed'
            });
            failed = true;
            return false; // Micro optimization - we no longer need to iterate here. jQuery css() method might be expansive.
          }
        });
      }

      var fontWeight = $paragraph.css('font-weight');
      if (fontWeight === 'bold' || +fontWeight >= 700) { // bold
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
