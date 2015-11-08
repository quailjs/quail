var AAdjacentWithSameResourceShouldBeCombined = function (quail, test, Case) {

  function findAdjacent (index, element) {
    var $element = $(element);
    // Find all the links
    var $links = $element.find('a');
    // Sort them into singletons and coupletons.
    var $singletons = $();
    var $coupletons = $();

    $links.each(function (index, link) {
      var $link = $(link);
      if ($link.next().is('a')) {
        $coupletons = $coupletons.add($link);
      }
      else {
        $singletons = $singletons.add($link);
      }
    });

    $singletons.each(excludeSingleLinks);
    $coupletons.each(checkNextLink);
  }

  function checkNextLink (index, element) {
    var $element = $(element);
    var thisHref = element.getAttribute('href');
    var $nextLink = $element.next();
    var nextHref = $nextLink[0].getAttribute('href');
    var status = 'passed';
    var _case = Case({
      element: element
    });
    if (thisHref === nextHref) {
      status = 'failed';
    }

    test.add(_case);
    _case.set({status: status});
  }

  function excludeSingleLinks (index, element) {
    var _case = Case({element: element});
    test.add(_case);
    _case.set({
      status: 'inapplicable'
    });
  }

  test.get('$scope').each(findAdjacent);
};
module.exports = AAdjacentWithSameResourceShouldBeCombined;
