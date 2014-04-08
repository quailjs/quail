quail.headersUsedToIndicateMainContent = function(quail, test, Case) {
  test.get('$scope').each(function() {
    var $local = $(this);
    var $content = quail.components.content.findContent($local);

    if (typeof $content !== 'undefined' && (
      $content.find(':header').length === 0 ||
      !$content.find(quail.textSelector).first().is(':header')
      )) {
      test.add(Case({
        element: $content.get(0),
        expected: $content.closest('.quail-test').data('expected'),
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: $content.get(0),
        expected: $content.closest('.quail-test').data('expected'),
        status: 'passed'
      }));
    }
  });
};
