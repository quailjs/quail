/**
 * Component to find the most likely element that
 * contains the main content.
 */

quail.components.content = {

  /**
   * Iterates over elments in the given context and looks
   * for elements that could be considered the main content area.
   *
   * @param {jQuery} $element
   *   The DOM element wrapper in jQuery to search for a content element within.
   * @return {jQuery}
   *   The jQuery element that is considered the content element.
   */
  findContent : function($element) {
    var $topScore = $element;
    if($element.find('[role=main]').length) {
      $element.find('[role=main]').first();
    }
    $('p').each(function() {
      var $parent = $(this).parent();
      var element = $parent.get(0);
      var contentScore = $parent.data('content-score') || 0;
      if (!$parent.data('content-score')) {

        contentScore = $parent.find('p').length;

        if (element.className.match(/(comment|meta|footer|footnote)/)) {
          contentScore -= 50;
        }
        else {
          if (element.className.match(/((^|\\s)(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)(\\s|$))/)) {
            contentScore += 25;
          }
        }

        if (element.id.match(/(comment|meta|footer|footnote)/)) {
          contentScore -= 50;
        }
        else {
          if (element.id.match(/^(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)$/)) {
            contentScore += 25;
          }
        }
        $parent.data('content-score', contentScore);
      }
      contentScore += $(this).text().split(',').length;
      if (typeof $topScore.data('content-score') === 'undefined' || contentScore > $topScore.data('content-score')) {
        $topScore = $parent;
      }
    });
    return $topScore;
  }
};
