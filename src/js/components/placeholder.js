/**
 * Placeholder test - checks that an attribute or the content of an
 * element itself is not a placeholder (i.e. "click here" for links).
 */
quail.components.placeholder = function(testName, options) {
  quail.html.find(options.selector).each(function() {
    var text;
    if(typeof options.attribute !== 'undefined') {
      if(typeof $(this).attr(options.attribute) === 'undefined' ||
            (options.attribute === 'tabindex' &&
              $(this).attr(options.attribute) <= 0
            )
         ) {
        quail.testFails(testName, $(this));
        return;
      }
      text = $(this).attr(options.attribute);
    }
    else {
      text = $(this).text();
      $(this).find('img[alt]').each(function() {
        text += $(this).attr('alt');
      });
    }
    if(typeof text === 'string') {
      text = quail.cleanString(text);
      var regex = /^([0-9]*)(k|kb|mb|k bytes|k byte)$/g;
      var regexResults = regex.exec(text.toLowerCase());
      if(regexResults && regexResults[0].length) {
        quail.testFails(testName, $(this));
      }
      else {
        if(options.empty && quail.isUnreadable(text)) {
          quail.testFails(testName, $(this));
        }
        else {
          if(quail.strings.placeholders.indexOf(text) > -1 ) {
            quail.testFails(testName, $(this));
          }
        }
      }
    }
    else {
      if(options.empty && typeof text !== 'number') {
        quail.testFails(testName, $(this));
      }
    }
  });
};