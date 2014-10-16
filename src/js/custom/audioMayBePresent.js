quail.audioMayBePresent=function(quail, test, Case){

  function getSource(element){
    var source=false;

    if (element.attr('src') !== undefined) {
      return element.attr('src');
    }

    if (element.find('source').attr('src') !== undefined) {
      return element.find('source').attr('src');
    }

    return source;
  }

  test.get('$scope').each(function(){
    var testableElements=$(this).find('audio, object');

    if (testableElements.length === 0) {
      var _case=Case({
        element: this,
        status: 'inapplicable',
        expected: $(this).closest('.quail-test').data('expected')
      });
      test.add(_case);
    }

    testableElements.each(function(){
      var fileTypes=['webm', 'flv', 'ogv', 'ogg', 'avi', 'mov', 'qt', 'wmv', 'asf', 'mp4', 'm4p', 'm4v', 'mpg', 'mp2', 'mpeg', 'mpg', 'mpe', 'mpv', 'm2v', '3gp', '3g2'];
      var _case=Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected')
      });
      test.add(_case);

      var source = getSource($(this));
      if (source && $.inArray(source.split('.').pop(), fileTypes) > -1) {
        _case.set({
          'status': 'cantTell'
        });
        return;
      }
      if($(this).find('param[name="src"]').attr('value') !== undefined){

        source = $(this).find('param[name="src"]').attr('value');
        $.each(fileTypes, function(index, item){
          if(source.indexOf("." + item) > -1) {
            _case.set({
              'status': 'cantTell'
            });
            return false;
          }
        });
        return;
      }
    });
  });
};
