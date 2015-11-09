'use strict';

var Case = require('Case');
var PNotUsedAsHeader = function PNotUsedAsHeader(quail, test) {
  test.get('$scope').find('p').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);

    var $paragraph = $(this);

    // If the text has a period, it is probably a sentence and not a header.
    if ($paragraph.text().search(/[\.!:;]/) >= 1) {
      _case.set({
        status: 'passed'
      });
    }
    var failed = false;
    // Look for any indication that the paragraph contains at least a full sentence
    if ($(this).text().search(/[\.!:;]/) < 1) {
      var priorParagraph = $paragraph.prev('p');
      // Checking if any of suspectPHeaderTags has exact the same text as a paragraph.
      $.each(quail.suspectPHeaderTags, function (index, tag) {
        if ($paragraph.find(tag).length) {
          $paragraph.find(tag).each(function () {
            if ($(this).text().trim() === $paragraph.text().trim()) {
              _case.set({
                status: 'failed'
              });
              failed = true;
            }
          });
        }
      });
      // Checking if previous paragraph has a different values for style properties given in quail.suspectPCSSStyles.
      if (priorParagraph.length) {
        $.each(quail.suspectPCSSStyles, function (index, cssProperty) {
          if ($paragraph.css(cssProperty) !== priorParagraph.css(cssProperty)) {
            _case.set({
              status: 'failed'
            });
            failed = true;
            return false; // Micro optimization - we no longer need to iterate here. jQuery css() method might be expensive.
          }
        });
      }
      if ($paragraph.css('font-weight') === 'bold') {
        _case.set({
          status: 'failed'
        });
        failed = true;
      }
    }
    if (!failed) {
      _case.set({
        status: 'passed'
      });
    }
  });
};
module.exports = PNotUsedAsHeader;