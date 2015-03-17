quail.imgGifNoFlicker = function(quail, test, Case) {
  test.get('$scope').find('img[src$=".gif"]').each(function() {
    var $image = $(this);
    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);
    $.ajax({
      url: $image.attr('src'),
      dataType: 'text',
      success: function(data) {
        if (data.search('NETSCAPE2.0') !== -1) {
          _case.set({
            'status' : 'failed'
          });
        }
        else {
          _case.set({
            'status' : 'inapplicable'
          });
        }
      }
    });
  });
};
