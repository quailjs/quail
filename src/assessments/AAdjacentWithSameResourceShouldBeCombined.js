var Case = require('Case');
var AAdjacentWithSameResourceShouldBeCombined = {
  run: function (test) {

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
  },

  meta: {
    testability: 1,
    title: {
      en: 'Adjacent links that point to the same location should be merged',
      nl: 'Voeg naast elkaar gelegen links die naar dezelfde locatie verwijzen samen'
    },
    description: {
      en: 'Because many users of screen-readers use links to navigate the page, providing two links right next to each other that point to the same location can be confusing. Try combining the links.',
      nl: 'Veel gebruikers van schermlezers gebruiken links om op de pagina te navigeren. Voor hen zijn naast elkaar gelegen links die naar dezelfde locatie verwijzen verwarrend. Probeer de links samen te voegen.'
    },
    guidelines: {
      wcag: {
        '2.4.4': {
          techniques: [
            'H2',
            'F89'
          ]
        },
        '2.4.9': {
          techniques: [
            'F89'
          ]
        },
        '4.1.2': {
          techniques: [
            'F89'
          ]
        }
      }
    },
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = AAdjacentWithSameResourceShouldBeCombined;
