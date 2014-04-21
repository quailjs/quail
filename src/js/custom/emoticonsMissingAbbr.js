quail.emoticonsMissingAbbr = function(quail, test, Case) {
  test.get('$scope').find(quail.textSelector + ':not(abbr, acronym)').each(function() {
    var $element = $(this);
    var $clone = $element.clone();
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    $clone.find('abbr, acronym').each(function() {
      $(this).remove();
    });
    var status = 'passed';
    $.each($clone.text().split(' '), function(index, word) {
      if (word.search(quail.emoticonRegex) > -1 ) {
        status = 'failed';
      }
    });
    _case.set({
      'status': status
    });
  });
};
