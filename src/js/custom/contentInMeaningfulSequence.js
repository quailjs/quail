quail.contentInMeaningfulSequence = function(quail, test, Case) {
  var $scope = test.get('$scope');
  $scope.each(function () {
    var $local = $(this);
    $local.find(quail.textSelector).each(function() {
      var _case = test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this))
      }));
      _case.set({status: 'failed'});
    });
  });
}
