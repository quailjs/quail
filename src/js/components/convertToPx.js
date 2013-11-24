/**
 * Converts units to pixels.
 */

quail.components.convertToPx = function(unit) {
	var $test = $('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: ' + unit + '; line-height: 1; border:0;">&nbsp;</div>').appendTo(quail.html);
	var height = $test.height();
	$test.remove();
	return height;
};
