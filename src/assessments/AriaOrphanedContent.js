// options: selector: "body *:not(*[role] *, *[role], script, meta, link)"

var Case = require('Case');

var AriaOrphanedContent = {
  run: function (test) {
    var $scope = test.get('$scope');

    $scope.each(function () {
      var $local = $(this);
      // Determine if the scope has a role.
      var scopeHasRole = !!$local.attr('role');
      // Determine if any child nodes have a role.
      var childrenHaveRole = !!$local.find('[role]').length;
      // If no roles exist, then this test is not applicable.
      if (!scopeHasRole && !childrenHaveRole) {
        test.add(Case({
          status: 'inapplicable'
        }));
        return;
      }
      // If roles exist, make sure all content is within a role.
      var $orphans = $local.find('*:not(*[role] *, *[role], script, meta, link)');
      if (!$orphans.length) {
        test.add(Case({
          status: 'passed'
        }));
      }
      // Otherwise, fail the content that falls outside a role.
      else {
        $orphans.each(function () {
          test.add(Case({
            element: this,
            status: 'failed'
          }));
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Pages using ARIA roles should not have orphaned content',
      nl: 'Pagina\'s die ARIA-rollen gebruiken mogen geen verweesde content hebben'
    },
    description: {
      en: 'If a page makes use of ARIA roles, then there should not be any content on the page which is not within an element that exposes a role, as it could cause that content to be rendreed inaccessible to users with screen readers.',
      nl: 'Als een pagina gebruik maakt van ARIA-rollen, mag er geen content op de pagina staan buiten een element dat een rol vertegenwoordigt. In dat geval kan het zijn dat deze content niet toegankelijk is voor gebruikers van schermlezers.'
    },
    guidelines: [

    ],
    tags: [
      'aria',
      'content'
    ]
  }
};
module.exports = AriaOrphanedContent;
