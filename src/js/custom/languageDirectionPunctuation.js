quail.languageDirectionPunctuation = function(quail, test, Case) {
  var $scope = test.get('$scope');
  var currentDirection = ($scope.attr('dir')) ? $scope.attr('dir').toLowerCase() : 'ltr';
  var oppositeDirection = (currentDirection === 'ltr') ? 'rtl' : 'ltr';
  var textDirection = quail.components.language.textDirection;
  $scope.each(function () {
    var $local = $(this);
    $local.find(quail.textSelector).each(function() {
      var $el = $(this);
      if ($el.attr('dir')) {
        currentDirection = $el.attr('dir').toLowerCase();
      }
      else {
        currentDirection = ($el.parent('[dir]').first().attr('dir')) ? $el.parent('[dir]').first().attr('dir').toLowerCase() : currentDirection;
      }
      if (typeof textDirection[currentDirection] === 'undefined') {
        currentDirection = 'ltr';
      }
      oppositeDirection = (currentDirection === 'ltr') ? 'rtl' : 'ltr';
      var text = quail.getTextContents($el);
      var matches = text.match(textDirection[oppositeDirection]);
      var _case = test.add(Case({
        element: this,
        expected: (function (element) {
          return quail.components.resolveExpectation(element);
        }(this))
      }));
      if (!matches) {
        _case.set({status : 'notApplicable'});
        return;
      }
      if (text.search('([\u2000-\u206F]' + textDirection[oppositeDirection] + ')|(' + textDirection[oppositeDirection] + '[\u2000-\u206F])')) {
        _case.set({status : 'failed'});
      }
      else {
        _case.set({status : 'passed'});
      }
      //console.log(matches.pop())
//(^)|([\u2000-\u206F]$)/ig
    });
  });
};
