quail.formWithRequiredLabel = function() {
   var redundant = quail.strings.redundant;
   var lastStyle, currentStyle = false;
   redundant.required[redundant.required.indexOf('*')] = /\*/g;
   quail.html.find('label').each(function() {
     var text = $(this).text().toLowerCase();
     var $label = $(this);
     $.each(redundant.required, function(index, word) {
       if(text.search(word) >= 0 && !quail.html.find('#' + $label.attr('for')).attr('aria-required')) {
         quail.testFails('formWithRequiredLabel', $label);
       }
     });
     currentStyle = $label.css('color') + $label.css('font-weight') + $label.css('background-color');
     if(lastStyle && currentStyle !== lastStyle) {
       quail.testFails('formWithRequiredLabel', $label);
     }
     lastStyle = currentStyle;
   });
};
