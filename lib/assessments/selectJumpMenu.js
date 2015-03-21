quail.selectJumpMenu = function (quail, test, Case) {
  var $scope = test.get('$scope');
  if ($scope.find('select').length === 0) {
    return;
  }

  $scope.find('select').each(function () {
    if ($(this).parent('form').find(':submit').length === 0 &&
        quail.components.hasEventListener($(this), 'change')) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        status: 'passed'
      }));
    }
  });
};
