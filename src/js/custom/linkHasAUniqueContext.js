quail.linkHasAUniqueContext=function(quail, test, Case){

  /**
   * Function for just testing the elements text, without checking text of children
   * @returns {*|jQuery}
   */
  jQuery.fn.getElementText=function(){
    return $(this).clone()
      .children()
      .remove()
      .end()
      .text();
  };

  function clean(node){
    for (var n=0; n < node.childNodes.length; n++) {
      var child=node.childNodes[n];
      if (child.nodeType === 8) {
        node.removeChild(child);
        n--;
      }
      else if (child.nodeType === 1) {
        clean(child);
      }
    }
  }

  function parentIsNativeStyle(parent){
    var nativeStyles=['b', 'strong', 'i', 'em', 'u'];
    var result=false;

    $.each(nativeStyles, function(index, item){
      if (parent.is(item)) {
        result=true;
      }
    });

    return result;
  }

  function hasTableHeaderContext(element){

    var $td=element.closest('td');
    var result=false;
    var $th=$td.closest('table').find('th').eq($td.index());
    var uniqueHeader=$td.attr('headers');
    var linkedHeader=element.closest('table').find('th#' + uniqueHeader + ',td#' + uniqueHeader);

    if ($th.length === 0) {
      $th=$td.prev().is('th') ? $td.prev() : false;
    }

    if ($th.length > 0 && $th.text() !== "" && $th.text() !== element.text()) {
      result=true;
    }

    if (uniqueHeader && linkedHeader.length > 0 && linkedHeader.text() !== "" && linkedHeader.text() !== element.text()) {
      result=true;
    }
    return result;
  }

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

        //Remove comments before testing
        clean($(this).closest('.quail-test')[0]);

        /**
         * todo: Variable below must be part of the failed test, but conflicts with the passed test. So have to find a way to integrate
         */
        var foundElementWithSameText = otherElementsWithSameText($(this));
        window.console.log(foundElementWithSameText);

        if(($(this).parent().getElementText().trim() !== "" && $(this).parent().getElementText().trim() === $(this).text()) ||
          (parentIsNativeStyle($(this).parent()) === true && $(this).parent().parent().getElementText().trim() !== "" && $(this).parent().parent().text() === $(this).text())){
          _case.set({
            'status': 'failed'
          });
          return;
        }

        if (
          hasTableHeaderContext($(this)) ||
          ($(this).find('img').length > 0 && $(this).find('img').attr('alt') !== $(this).text()) ||
          ($(this).attr('title') !== undefined && $(this).attr('title') !== $(this).text()) ||
          !$(this).prev().is('br')
          ) {
          _case.set({
            'status': 'passed'
          });
          return;
        } else {
          _case.set({
            'status': 'failed'
          });
          return;
        }

      });
    }
  });
  function otherElementsWithSameText(element){

    var result=false;

    element.parent().find('a').each(function(index, aElement){
      if (element.is($(aElement))) {
        result=false;
      }

      if (similarStrings(element.text(), $(aElement).text()) > 0.4) {
        result=true;
      } else {
        result=false;
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
}
;