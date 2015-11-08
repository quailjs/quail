'use strict';

var LanguageComponent = require('LanguageComponent');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var LanguageDirectionPunctuation = function LanguageDirectionPunctuation(quail, test, Case) {
  var $scope = test.get('$scope');
  var punctuation = {};
  var punctuationRegex = /[\u2000-\u206F]|[!"#$%&'\(\)\]\[\*+,\-.\/:;<=>?@^_`{|}~]/gi;
  var currentDirection = $scope.attr('dir') ? $scope.attr('dir').toLowerCase() : 'ltr';
  var oppositeDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';
  var textDirection = LanguageComponent.textDirection;
  $scope.each(function () {
    var $local = $(this);
    $local.find(quail.textSelector).filter(function (index, element) {
      return TextNodeFilterComponent(element);
    }).each(function () {
      var $el = $(this);
      if ($el.attr('dir')) {
        currentDirection = $el.attr('dir').toLowerCase();
      } else {
        currentDirection = $el.parent('[dir]').first().attr('dir') ? $el.parent('[dir]').first().attr('dir').toLowerCase() : currentDirection;
      }
      if (typeof textDirection[currentDirection] === 'undefined') {
        currentDirection = 'ltr';
      }
      oppositeDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';
      var text = quail.getTextContents($el);
      var matches = text.match(textDirection[oppositeDirection]);
      var _case = test.add(Case({
        element: this
      }));
      if (!matches) {
        _case.set({ status: 'inapplicable' });
        return;
      }
      var first = text.search(textDirection[oppositeDirection]);
      var last = text.lastIndexOf(matches.pop());
      while (punctuation = punctuationRegex.exec(text)) {
        if (punctuation.index === first - 1 || punctuation.index === last + 1) {
          _case.set({ status: 'failed' });
          return;
        }
      }
      _case.set({ status: 'passed' });
    });
  });
};;
module.exports = LanguageDirectionPunctuation;