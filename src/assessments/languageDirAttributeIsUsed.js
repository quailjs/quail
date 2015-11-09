var Case = require('Case');
var LanguageComponent = require('LanguageComponent');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var LanguageDirAttributeIsUsed = function (quail, test) {

  var textDirection = LanguageComponent.textDirection;

  function countDirAttributes () {
    var $el = $(this);
    var currentDirection = $el.attr('dir');
    if (!currentDirection) {
      var parentDir = $el.closest('[dir]').attr('dir');
      currentDirection = parentDir || currentDirection;
    }
    if (typeof currentDirection === 'string') {
      currentDirection = currentDirection.toLowerCase();
    }
    if (typeof textDirection[currentDirection] === 'undefined') {
      currentDirection = 'ltr';
    }
    var oppositeDirection = (currentDirection === 'ltr') ? 'rtl' : 'ltr';
    var text = quail.getTextContents($el);
    var textMatches = text.match(textDirection[oppositeDirection]);
    if (!textMatches) {
      return;
    }
    var matches = textMatches.length;
    $el.find('[dir=' + oppositeDirection + ']').each(function () {
      var childMatches = $el[0].textContent.match(textDirection[oppositeDirection]);
      if (childMatches) {
        matches -= childMatches.length;
      }
    });

    var _case = test.add(Case({
      element: this
    }));

    _case.set({status: (matches > 0) ? 'failed' : 'passed'});
  }

  test.get('$scope').each(function () {
    $(this)
      .find(quail.textSelector)
      .filter(function (index, element) {
        return TextNodeFilterComponent(element);
      })
      .each(countDirAttributes);
  });
};
module.exports = LanguageDirAttributeIsUsed;
