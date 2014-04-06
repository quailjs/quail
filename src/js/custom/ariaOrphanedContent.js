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
        status: 'notApplicable'
      }));
    }
  });
};
