// options: selector: "body *:not(*[role] *, *[role], script, meta, link)"

quail.ariaOrphanedContent = function(quail, test, Case) {
  var $scope = test.get('$scope');
  //debugger;
  $scope.each(function() {
    var $local = $(this);
    // Determine if the scope has a role.
    var scopeHasRole = !!$local.attr('role');
    // Determine if any child nodes have a role.
    var childrenHaveRole = !!$local.find('[role]').length;
    // If no roles exist, then this test is not applicable.
    if (!scopeHasRole && !childrenHaveRole) {
      test.add(Case({
        expected: $local.data('expected'),
        status: 'inapplicable'
      }));
      return;
    }
    // If roles exist, make sure all content is within a role.
    var $orphans = $local.find('*:not(*[role] *, *[role], script, meta, link)');
    if (!$orphans.length) {
      test.add(Case({
        expected: $local.data('expected'),
        status: 'passed'
      }));
    }
    // Otherwise, fail the content that falls outside a role.
    else {
      $orphans.each(function() {
        test.add(Case({
          element: this,
          expected: $(this).closest('.quail-test').data('expected'),
          status: 'failed'
        }));
      });
    }
  });
};
