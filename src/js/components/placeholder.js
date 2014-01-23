/**
 * Placeholder test - checks that an attribute or the content of an
 * element itself is not a placeholder (i.e. "click here" for links).
 */
quail.components.placeholder = function(testName, options) {
  quail.html.find(options.options.selector).each(function() {
    var text = '';
    if(typeof options.options.attribute !== 'undefined') {
      if((typeof $(this).attr(options.options.attribute) === 'undefined' ||
            (options.options.attribute === 'tabindex' &&
              $(this).attr(options.options.attribute) <= 0
            )
         ) &&
         !options.options.content
        ) {
        quail.testFails(testName, $(this));
        return;
      }
      else {
        if($(this).attr(options.options.attribute) && $(this).attr(options.options.attribute) !== 'undefined') {
          text += $(this).attr(options.options.attribute);
        }
      }
    }
    if(typeof options.options.attribute === 'undefined' ||
      !options.options.attribute ||
      options.options.content) {
      text += $(this).text();
      $(this).find('img[alt]').each(function() {
        text += $(this).attr('alt');
      });
    }
    if(typeof text === 'string' && text.length > 0) {
      text = quail.cleanString(text);
      var regex = /^([0-9]*)(k|kb|mb|k bytes|k byte)$/g;
      var regexResults = regex.exec(text.toLowerCase());
      if(regexResults && regexResults[0].length) {
        quail.testFails(testName, $(this));
      }
      else {
        if(options.options.empty && quail.isUnreadable(text)) {
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
      if(options.options.empty && typeof text !== 'number') {
        quail.testFails(testName, $(this));
      }
    }
  });
};