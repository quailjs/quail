quail.blockquoteUseForQuotations = function() {
  quail.html.find('p').each(function() {
    if($(this).text().substr(0, 1).search(/[\'\"]/) > -1 &&
       $(this).text().substr(-1, 1).search(/[\'\"]/) > -1) {
      quail.testFails('blockquoteUseForQuotations', $(this));
    }
  });
};
