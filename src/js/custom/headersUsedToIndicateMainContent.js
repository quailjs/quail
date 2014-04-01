quail.headersUsedToIndicateMainContent = function() {
  var $content = quail.components.content.findContent(quail.html);
  if (typeof $content !== 'undefined' && (
    $content.find(':header').length === 0 ||
    !$content.find(quail.textSelector).first().is(':header')
    )) {
    quail.testFails('headersUsedToIndicateMainContent', $content);
  }
};
