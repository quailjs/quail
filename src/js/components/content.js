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
   *   The jQuery element that is considered the most likely content element.
   */
  findContent : function($element) {
    var $topScore = $element;
    //If an element has the ARIA role of "main," it's safe to assume that it is the main content.
    if ($element.is('[role=main]')) {
      return $element;
    }
    if ($element.find('[role=main]').length) {
      return $element.find('[role=main]').first();
    }
    //If there are no paragraphs in the subject at all, we return the subject.
    if ($element.find('p').length === 0) {
      return $element;
    }
    $element.find('p').each(function() {
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
