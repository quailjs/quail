quail.aAdjacentWithSameResourceShouldBeCombined = function(quail, test, Case) {
  //var $applicableElements = test.get('$scope').find('a');

  function findAdjacent(index, element) {
    var $element = $(element);
    var adjacentLinks = $element.find('a + a').length > 0;
    var $links = $element.find('a');

    // no adjacent links, exclude all.
    if (!adjacentLinks) {
      $links.each(excludeSingleLinks);
    }
    else {
      $links.each(checkNextLink);
    }
  }

  function checkNextLink(index, element) {
    var $element = $(element);
    var thisHref = element.getAttribute('href');
    var $nextLink = $element.find('+ a');
    if (!$nextLink.length) {
      // We're going over the second link.
      return;
    }
    var nextHref = $nextLink[0].getAttribute('href');
    var status = 'passed';
    var _case = Case({
      element: element,
      expected: $element.closest('.quail-test').data('expected')
    });
    if (thisHref === nextHref) {
      status = 'failed';
    }

    test.add(_case);
    _case.set({'status': status});
  }

  function excludeSingleLinks(index, element) {
    var _case = Case({ element: element });
    test.add(_case);
    _case.set({
      'status': 'inapplicable',
      expected: $(element).closest('.quail-test').data('expected')
    });
  }

  test.get('$scope').each(findAdjacent);
};
