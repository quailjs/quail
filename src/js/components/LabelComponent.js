var LabelComponent = function (quail, test, Case, options) {
  var $scope = test.get('$scope');
  $scope.each(function () {
    var $local = $(this);
    $local.find(options.selector).each(function () {
      if ((!$(this).parent('label').length ||
        !$local.find('label[for=' + $(this).attr('id') + ']').length ||
          !quail.containsReadableText($(this).parent('label'))) &&
          (!quail.containsReadableText($local.find('label[for=' + $(this).attr('id') + ']')))) {
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
  });
};
module.exports = LabelComponent;
