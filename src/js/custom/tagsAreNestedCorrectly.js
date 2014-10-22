quail.tagsAreNestedCorrectly=function(quail, test, Case){

  quail.components.htmlSource.getHtml(function(html) {
    var regex = /<div class="quail-test"[\S\s]*?>([\S\s]*?)<\/div>/gmi;
    var tests = [];
    var testBlocks = test.get('scope');

    var match;
    while((match = regex.exec(html)) !== null){
      tests.push(match[1]);
    }
    $.each(tests, function(index, testHTML){
      var testBlock = testBlocks[index];
      var _case=Case({
        element: this,
        expected: $(testBlock).data('expected')
      });
      test.add(_case);

      if(quail.components.htmlTagValidator(testHTML)){
        _case.set({
          'status': 'passed'
        });
      }else{
        _case.set({
          'status': 'failed'
        });
      }
      return;
    });
  });
};