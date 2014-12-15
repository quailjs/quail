quail.linkHasAUniqueContext = function(quail, test, Case) {
  
  var blockStyle = ['block', 'flex', 'list-item', 'table', 
  'table-caption', 'table-cell'];

  function getLinkSentence(link) {
    // Find the closest block-like element
    var $link = $(link);
    var block = $link;
    var text = simplifyText($link.text());

    while(!block.is('body, html') &&
    blockStyle.indexOf(block.css('display')) === -1) {
      block = block.parent();
    }

    var sentences = block.text().match(/[^\.!\?]+[\.!\?]+/g);
    if (sentences === null) {
      sentences = [block.text()];
    }

    for (var i = 0; i < sentences.length; i+= 1) {
      if (simplifyText(sentences[i]).indexOf(text) !== -1) {
        return sentences[i].trim();
      }
    }
  }

  function simplifyText(text) {
    var tmp = text.match(/\w+/g);
    if (tmp !== null) {
      text = tmp.join(' ');
    }
    return text.toLowerCase();
  }

  function txtNotAlike(a, b) {
    return simplifyText("" + a) !== simplifyText("" + b);
  }


  function shareContext(linkA, linkB) {

    if (linkA.href === linkB.href) {
      return false;

    } else if (txtNotAlike(linkA.title, linkB.title)) {
      return false;
    }

    // Find the nearest list item, paragraph or table cell of both items
    var linkACtxt = $(linkA).closest('p, li, dd, dt, td, th');
    var linkBCtxt = $(linkB).closest('p, li, dd, dt, td, th');
    // check if they are different
    if (linkACtxt.length !== 0 && linkBCtxt.length !== 0 &&
    txtNotAlike(getLinkText(linkACtxt), getLinkText(linkBCtxt))) {
      return false;
    }

    if (linkACtxt.is('td')) {
      // Locate the table headers
    }

    if (txtNotAlike(getLinkSentence(linkA), getLinkSentence(linkB))) {
      return false;
    }

    return true;
  }


  /**
   * Get the text value of the link, including alt attributes
   * @param  {jQuery} $link
   * @return {string}
   */
  function getLinkText($link) {
    var text = $link.text();
    $link.find('img[alt]').each(function () {
      text += ' ' + this.alt.trim();
    });
    return simplifyText(text);
  }

try {
  test.get('$scope').each(function() {
    var $scope = $(this);
    var $links = $scope.find('a[href]:visible');
    var linkMap = {};


    if ($links.length === 0) {
      var _case = Case({
        element: this,
        status: 'inapplicable',
        expected: $scope.closest('.quail-test').data('expected')
      });
      test.add(_case);
    }

    // Make a map with the link text as key and an array of links with
    // that link text as it's value
    $links.each(function () {
      var text = getLinkText($(this));
      if (typeof linkMap[text] === 'undefined') {
        linkMap[text] = [];
      }
      linkMap[text].push(this);
    });


    // Iterate over each item in the linkMap
    $.each(linkMap, function (linkText, links) {

      // Link text is not unique, so the context should be checked
      while (links.length > 1) {
        var linkA = links.pop();
        var linkAFailed = false;

        for (var i=links.length - 1; i >= 0; i -= 1) {
          var linkB = links[i];
          if (shareContext(linkA, linkB)) {
            linkAFailed = true;
            links.splice(i, 1);
            test.add(Case({
              element: linkB,
              status: 'failed',
              expected: $(linkB).closest('.quail-test').data('expected')
            }));
          }
        }
        test.add(Case({
          element: linkA,
          status: (linkAFailed ? 'failed' : 'passed'),
          expected: $(linkA).closest('.quail-test').data('expected')
        }));
      }

      // The link text is unique, pass
      if (links.length === 1) {
        test.add(Case({
          element: links[0],
          status: 'passed',
          expected: $(links[0]).closest('.quail-test').data('expected')
        }));
      }
    });

  });
} catch(e) {
  console.error(e);
}


  /**
   * Function for just testing the elements text, without checking text of children
   * @returns {*|jQuery}
   */
  // jQuery.fn.getElementText=function() {
  //   return $(this).clone()
  //     .children()
  //     .remove()
  //     .end()
  //     .text();
  // };

  // function clean(node) {
  //   for (var n=0; n < node.childNodes.length; n++) {
  //     var child=node.childNodes[n];
  //     if (child.nodeType === 8) {
  //       node.removeChild(child);
  //       n--;
  //     }
  //     else if (child.nodeType === 1) {
  //       clean(child);
  //     }
  //   }
  // }

  // function parentIsNativeStyle(parent) {
  //   var nativeStyles=['b', 'strong', 'i', 'em', 'u'];
  //   var result=false;

  //   $.each(nativeStyles, function(index, item){
  //     if (parent.is(item)) {
  //       result=true;
  //     }
  //   });

  //   return result;
  // }

  // function hasTableHeaderContext(element) {

  //   var $td=element.closest('td');
  //   var result=false;
  //   var $th=$td.closest('table').find('th').eq($td.index());
  //   var uniqueHeader=$td.attr('headers');
  //   var linkedHeader=element.closest('table').find('th#' + uniqueHeader + ',td#' + uniqueHeader);

  //   if ($th.length === 0) {
  //     $th=$td.prev().is('th') ? $td.prev() : false;
  //   }

  //   if ($th.length > 0 && $th.text() !== "" && $th.text() !== element.text()) {
  //     result=true;
  //   }

  //   if (uniqueHeader && linkedHeader.length > 0 && linkedHeader.text() !== "" && linkedHeader.text() !== element.text()) {
  //     result=true;
  //   }
  //   return result;
  // }


  // function notInSameSentence(element){
  //   var regex=/<a[^>]+>.+?<\/a>(.?)/gmi;
  //   var parentText=element.parent().html().replace(/ /g, '');
  //   var match;
  //   var result=false;

  //   while ((match=regex.exec(parentText)) !== null) {
  //     if (match[1] === '.') {
  //       result=true;
  //     }
  //   }

  //   return result;
  // }

  // function otherElementsWithSameText(element){

  //   var result = false;
  //   var elements = element.parent().find('a');


  //   elements.each(function(index, aElement){
  //     if (element.is($(aElement))) {
  //       result = false;
  //     } else if (element[0].isEqualNode(aElement)) {
  //       result = false;
  //     } else if (similarStrings(element.text(), $(aElement).text()) > 0.4) {
  //       result = true;
  //       return false;
  //     } else {
  //       result = false;
  //     }
  //   });

  //   return result;
  // }

  // /*
  //  * Functions for testing string similarity
  //  */
  // function similarStrings(stringA, stringB){
  //   var string1=stringA.toLowerCase().replace(/\s/g, "".toLowerCase());
  //   var string2=stringB.toLowerCase().replace(/\s/g, "".toLowerCase());


  //   var similarity_number=2 * stringIntersect(pairs(string1), pairs(string2)).length;
  //   var similarity_density=pairs(string1).length + pairs(string2).length;
  //   var similarity=similarity_number / similarity_density;

  //   return similarity;
  // }


  // function stringIntersect(array1, array2){
  //   var a=[];
  //   var o={};
  //   var l=array2.length;
  //   var v;
  //   var i;

  //   for (i=0; i < l; i++) {
  //     o[array2[i]]=true;
  //   }

  //   l=array1.length;
  //   for (i=0; i < l; i++) {
  //     v=array1[i];
  //     if (v in o) {
  //       a.push(v);
  //     }
  //   }
  //   return a;
  // }

  // function pairs(string){
  //   var pairsArray=[];
  //   for (var i=0; i < string.length - 1; i++) {
  //     pairsArray[i]=string.slice(i, i + 2);
  //   }
  //   return pairsArray;
  // }

  // test.get('$scope').each(function() {

  //   var testableElements = $(this).find('a');

  //   if (testableElements.length === 0) {
  //     var _case = Case({
  //       element: this,
  //       status: 'inapplicable',
  //       expected: $(this).closest('.quail-test').data('expected')
  //     });
  //     test.add(_case);
  //   }

  //   testableElements.each(function() {
  //     var _case=Case({
  //       element: this,
  //       expected: $(this).closest('.quail-test').data('expected')
  //     });
  //     test.add(_case);

  //     //Remove comments before testing
  //     clean($(this).closest('.quail-test')[0]);

  //     var foundElementWithSameText = otherElementsWithSameText($(this));
  //     if (($(this).parent().getElementText().trim() !== "" && $(this).parent().getElementText().trim() === $(this).text()) ||
  //     (parentIsNativeStyle($(this).parent()) === true && $(this).parent().parent().getElementText().trim() !== "" && $(this).parent().parent().text() === $(this).text()) ||
  //     $(this).prev().is('br') ||
  //     notInSameSentence($(this))) {
  //       _case.set({
  //         'status': 'failed'
  //       });

  //     } else if (hasTableHeaderContext($(this)) ||
  //     ($(this).find('img').length > 0 && $(this).find('img').attr('alt') !== $(this).text()) ||
  //     ($(this).attr('title') !== undefined && $(this).attr('title') !== $(this).text()) || !foundElementWithSameText) {
  //       _case.set({
  //         'status': 'passed'
  //       });

  //     } else {
  //       _case.set({
  //         'status': 'failed'
  //       });
  //     }
  //   });
  // });

};