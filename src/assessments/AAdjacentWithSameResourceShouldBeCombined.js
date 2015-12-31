var Case = require('Case');
const DOM = require('DOM');
var AAdjacentWithSameResourceShouldBeCombined = {
  run: function (test) {

    function findAdjacent (element) {
      // Find all the links
      var links = DOM.scry('a', element);
      // Sort them into singletons and coupletons.
      var $singletons = [];
      var $coupletons = [];

      links.forEach(function (link) {
        var next = DOM.next(link);
        if (next.is('a')) {
          $coupletons.push(link);
        }
        else {
          $singletons.push(link);
        }
      });

      $singletons.forEach(excludeSingleLinks);
      $coupletons.forEach(checkNextLink);
    }

    function checkNextLink (element) {
      var thisHref = element.getAttribute('href');
      var next = DOM.next(element);
      var nextHref = next.getAttribute('href');
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

    function excludeSingleLinks (element) {
      var _case = Case({element: element});
      test.add(_case);
      _case.set({
        status: 'inapplicable'
      });
    }

    test.get('scope').forEach(findAdjacent);
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
