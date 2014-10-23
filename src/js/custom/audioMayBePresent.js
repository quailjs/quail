quail.audioMayBePresent=function(quail, test, Case){
  var fileTypes=['mp3', 'm4p', 'ogg', 'oga', 'opus', 'wav', 'wma', 'wv'];

  function getSource(element){
    if (element.is('a')) {
      return element.attr('href');
    }

    if (element.attr('src') !== undefined) {
      return element.attr('src');
    }

    if (element.find('source').attr('src') !== undefined) {
      return element.find('source').attr('src');
    }
  }

  test.get('$scope').each(function() {
    var testableElements=$(this).find('audio, object, a[href]');
    var hasCase = false;

    testableElements.each(function(){
      var $this = $(this);
      var source = getSource($this);
      
      if ($this.is('object')) {
        hasCase = true;
        test.add(Case({
          element: this,
          expected: $this.closest('.quail-test').data('expected'),
          status: 'cantTell'
        }));

      } else if (source && $.inArray(source.split('.').pop(), fileTypes) > -1) {
        hasCase = true;
        test.add(Case({
          element: this,
          expected: $this.closest('.quail-test').data('expected'),
          status: 'cantTell'
        }));

      } else if($this.find('param[name="src"]').attr('value') !== undefined &&
      $.inArray(source.split('.').pop(), fileTypes) > -1) {

        hasCase = true;
        test.add(Case({
          element: this,
          expected: $this.closest('.quail-test').data('expected'),
          status: 'cantTell'
        }));
      }
    });

    if (!hasCase) {
      test.add(Case({
        element: this,
        status: 'inapplicable',
        expected: $(this).closest('.quail-test').data('expected')
      }));
    }
  });

};