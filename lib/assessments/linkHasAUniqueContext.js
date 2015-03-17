quail.linkHasAUniqueContext = function (quail, test, Case) {

  var blockStyle = [
    'block',
    'flex',
    'list-item',
    'table',
    'table-caption',
    'table-cell'
  ];

  function getLinkSentence (link) {
    // Find the closest block-like element
    var $link = $(link);
    var block = $link;
    var text = simplifyText($link.text());

    while(!block.is('body, html') && blockStyle.indexOf(block.css('display')) === -1) {
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

  function simplifyText (text) {
    var tmp = text.match(/\w+/g);
    if (tmp !== null) {
      text = tmp.join(' ');
    }
    return text.toLowerCase();
  }

  function txtNotAlike (a, b) {
    return simplifyText("" + a) !== simplifyText("" + b);
  }


  function shareContext (linkA, linkB) {

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

    // If one is a table cell and the other isn't, allow it
    if (linkACtxt.is('td, th') && !linkBCtxt.is('td, th')) {
      return false;

    } else if (linkACtxt.is('td, th') && linkBCtxt.is('td, th')) {
      var headerDiff = false;
      var headersA = [];

      // Make a list with the simplified text of link A
      linkACtxt.tableHeaders().each(function () {
        headersA.push(simplifyText($(this).text()));
      });

      // Compare it to the header context of link B
      linkBCtxt.tableHeaders().each(function () {
        var text = simplifyText($(this).text());
        var pos = headersA.indexOf(text);
        // Link B has something not part of link A's context, pass
        if (pos === -1) {
          headerDiff = true;

        // Remove items part of both header lists
        } else {
          headersA.splice(pos, 1);
        }
      });
      // Pass if A or B had a header not part of the other.
      if (headerDiff || headersA.length > 0) {
        return false;
      }
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
  function getLinkText ($link) {
    var text = $link.text();
    $link.find('img[alt]').each(function () {
      text += ' ' + this.alt.trim();
    });
    return simplifyText(text);
  }

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
};
