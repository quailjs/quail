var Case = require('Case');
var RedundantStringsComponent = require('RedundantStringsComponent');
var ALinkTextDoesNotBeginWithRedundantWord = function (quail, test) {
  test.get('$scope').find('a').each(function () {
    var self = this;
    var $link = $(this);
    var text = '';
    var $img = $link.find('img[alt]');
    if ($img.length) {
      text = text + $img.eq(0).attr('alt');
    }
    text = text + $link.text();
    text = text.toLowerCase();
    var _case;
    // Search the text for redundant words. Break as soon as one is detected.
    for (var i = 0, il = RedundantStringsComponent.link.length; i < il; ++i) {
      var phrase = RedundantStringsComponent.link[i];
      if (text.search(phrase) > -1) {
        _case = test.add(Case({
          element: self,
          status: 'failed'
        }));
        break;
      }
    }
    // If the case didn't fail, then it passed.
    if (!_case) {
      test.add(Case({
        element: self,
        status: 'passed'
      }));
    }
  });
};
module.exports = ALinkTextDoesNotBeginWithRedundantWord;
