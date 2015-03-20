quail.scriptFocusIndicatorVisible = function () {
  quail.html.find(quail.focusElements).each(function () {

    // Preparation for test: remove focus indicators done with CSS
    var sheet, rules, rulesCache, rule;

    rulesCache = [];

    for (var i = 0, l = document.styleSheets.length; i < l; ++i) {
      sheet = document.styleSheets[i];
      rules = sheet.cssRules || sheet.rules;

      for (var j = rules.length - 1; j >= 0; --j) {
        rule = rules[j];
        if (rule.selectorText && rule.selectorText.indexOf(':focus') !== -1) {
          rulesCache.push({
            css: rule.cssText,
            index: j,
            sheet: i
          });

          sheet.deleteRule(j);
        }
      }
    }

    var noFocus = {
      borderWidth: $(this).css('border-width'),
      borderColor: $(this).css('border-color'),
      backgroundColor: $(this).css('background-color'),
      boxShadow: $(this).css('box-shadow'),
      outlineWidth: $(this).css('outline-width'),
      outlineColor: $(this).css('outline-color')
    };

    $(this).focus();

    // it is sufficient to not remove the default outline on focus: pass test
    var outlineWidth = quail.components.convertToPx($(this).css('outline-width'));
    if (outlineWidth > 2 && outlineWidth !== quail.components.convertToPx(noFocus.outlineWidth)) {
      $(this).blur();
      return;
    }

    // in any other case, it is acceptable to change other visual components

    if (noFocus.backgroundColor !== $(this).css('background-color')) {
      $(this).blur();
      return;
    }

    var borderWidth = quail.components.convertToPx($(this).css('border-width'));
    if (borderWidth > 2 && borderWidth !== quail.components.convertToPx(noFocus.borderWidth)) {
      $(this).blur();
      return;
    }

    var boxShadow = ($(this).css('box-shadow') && $(this).css('box-shadow') !== 'none') ? $(this).css('box-shadow').match(/(-?\d+px)|(rgb\(.+\))/g) : false;
    if (boxShadow && $(this).css('box-shadow') !== noFocus.boxShadow && quail.components.convertToPx(boxShadow[3]) > 3) {
      $(this).blur();
      return;
    }

    $(this).blur();

    var ruleCache;

    for (var k = rulesCache.length - 1; k >= 0; --i) {
      ruleCache = rulesCache[k];

      document.styleSheets[ruleCache.sheet].insertRule(ruleCache.css, ruleCache.index);
    }

    quail.testFails('scriptFocusIndicatorVisible', $(this));
  });
};
