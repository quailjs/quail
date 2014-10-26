quail.languageUnicodeDirection = function(quail, test, Case) {
  var $scope = test.get('$scope');
  var textDirection = quail.components.language.textDirection;
  var textDirectionChanges = quail.components.language.textDirectionChanges;
  $scope.each(function () {
    var $local = $(this);
    $local.find(quail.textSelector).each(function() {
      var _case = test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this))
      }));
      var $el = $(this);
      var text = $el.text().trim();
      var otherDirection = (text.substr(0, 1).search(textDirection['ltr']) !== -1) ?
        'rtl' :
        'ltr';
      if (text.search(textDirection[otherDirection]) === -1) {
        _case.set({status: 'inapplicable'});
      }
      else {
        if(text.search(textDirectionChanges[otherDirection]) !== -1) {
          _case.set({status: 'passed'});
        }
        else {
          _case.set({status: 'failed'});
        }
      }
    });
  });
};
