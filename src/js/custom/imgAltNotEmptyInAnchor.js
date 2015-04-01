quail.imgAltNotEmptyInAnchor = function(quail, test, Case) {
  test.get('$scope').find('a[href] img').each(function() {
    var $img  = $(this);
    var $a   = $img.closest('a');
    var text = $a.text();

    var _case = Case({
      element: this,
      expected: $img.closest('.quail-test').data('expected')
    });
    test.add(_case);

    // Concat all alt attributes of images to the text of the paragraph
    $a.find('img[alt]').each(function () {
      text += ' ' + $(this).attr('alt');
    });

    if (quail.isUnreadable(text)) {
      _case.set({
        'status': 'failed'
      });
    }
    else {
      _case.set({
        'status': 'passed'
      });
    }
  });
};
