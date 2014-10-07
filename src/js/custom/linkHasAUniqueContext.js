quail.linkHasAUniqueContext=function(quail, test, Case){

  test.get('$scope').each(function(){

    var testableElements=$(this).find('a');


    if (testableElements.length === 0) {

      var _case=Case({
        element: this,
        status: 'inapplicable',
        expected: $(this).closest('.quail-test').data('expected')
      });
      test.add(_case);
    } else {

      testableElements.each(function(){
        var _case=Case({
          element: this,
          expected: $(this).closest('.quail-test').data('expected')
        });
        test.add(_case);

        if (
          ($(this).find('img').length > 0 && $(this).find('img').attr('alt') !== $(this).text()) ||
          ($(this).attr('title') && $(this).attr('title') !== $(this).text()) ||
          ($(this).parent().text() !== "" && $(this).parent().text() !== $(this).text()) ||
          !otherElementsWithSameText($(this))
          ) {
          _case.set({
            'status': 'passed'
          });
          return;
        } else {
          _case.set({
            'status': 'false'
          });
          return;
        }

      });
    }
  });

  function otherElementsWithSameText(element){

    var result = true;

    element.parent().find('a').each(function(index, aElement){

      if (element.is($(aElement))) {
        result = true;
        return;
      }

      if(similarStrings(element.text(), $(aElement).text()) > 0.4){
        result = false;
      }else{
        result = true;
      }
    });

    return result;
  }

  /*
   * Functions for testing string similarity
   */
  function similarStrings(stringA, stringB){
    var string1=stringA.toLowerCase().replace(/\s/g, "".toLowerCase());
    var string2=stringB.toLowerCase().replace(/\s/g, "".toLowerCase());


    var similarity_number=2 * stringIntersect(pairs(string1), pairs(string2)).length;
    var similarity_density=pairs(string1).length + pairs(string2).length;
    var similarity=similarity_number / similarity_density;

    return similarity;
  }


  function stringIntersect(array1, array2){
    var a=[];
    var o={};
    var l=array2.length;
    var v;
    var i;

    for (i=0; i < l; i++) {
      o[array2[i]]=true;
    }

    l=array1.length;
    for (i=0; i < l; i++) {
      v=array1[i];
      if (v in o) {
        a.push(v);
      }
    }
    return a;
  }

  function pairs(string){
    var pairsArray=[];
    for (var i=0; i < string.length - 1; i++) {
      pairsArray[i]=string.slice(i, i + 2);
    }
    return pairsArray;
  }
};