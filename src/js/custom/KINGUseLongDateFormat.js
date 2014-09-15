quail.KINGUseLongDateFormat = function (quail, test, Case) {

  function testDateFormat(index, element) {
    // Detect dates with several separators.
    var dateReg = /\d{1,2}([./-])\d{1,2}\1\d{2,4}/g;

    var text = quail.getTextContents($(element));
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    // Only test if there is one date in the wrong format and call it.
    _case.set({
      'status': dateReg.test(text) ? 'failed' : 'passed'
    });
  }

  // Note it should also contain div, but that would lead to other issues.
  var appliableElements = 'a, article, aside, b, blockquote, caption, cite, dd, del, div, em, figcaption, footer, h1, h2, h3, h4, h5, h6, header, i, label, legend, li, mark, nav, option, p, q, s, section, small, span, strong, sub, summary, sup, td, th, title, u';

  test.get('$scope').find(appliableElements).each(testDateFormat);
};
