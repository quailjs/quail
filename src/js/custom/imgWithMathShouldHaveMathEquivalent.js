quail.imgWithMathShouldHaveMathEquivalent = function() {
  quail.html.find('img:not(img:has(math), img:has(tagName))').each(function() {
    if(!$(this).parent().find('math').length) {
      quail.testFails('imgWithMathShouldHaveMathEquivalent', $(this));
    }
  });
};
