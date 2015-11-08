/**
 * Test for a label associated with a file input element.
 */
var FileHasLabel = function (quail, test, Case) {

  var sFiles = '[type="file"]';
  var sLabels = 'label';

  function countOfLabelsById (id, labels) {
    // Map labels by for attribute value.
    var labelsByFor = 0;
    for (var i = 0, il = labels.length; i < il; ++i) {
      var $label = labels.eq(i);
      if ($label.attr('for') === id) {
        labelsByFor++;
      }
    }
    return labelsByFor;
  }

  this.get('$scope').each(function () {
    var $scope = $(this);
    var files = $scope.find(sFiles);
    var labels = $scope.find(sLabels);

    if (files.length === 0) {
      test.add(Case({
        element: undefined,
        status: 'inapplicable'
      }));
    }
    else {
      files.each(function () {
        var $file = $(this);
        var status = 'failed';

        // Check for an associated label.
        var id = $file.attr('id');
        if (id) {
          var labelCount = countOfLabelsById(id, labels);
          if (labelCount === 1) {
            status = 'passed';
          }
        }

        test.add(Case({
          element: this,
          status: status
        }));
      });
    }
  });
};;
module.exports = FileHasLabel;
