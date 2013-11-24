/**
 * Returns whether an element has an event handler or not.
 */
quail.components.hasEventListener = function(element, event) {
	if(typeof $(element).attr('on' + event) !== 'undefined') {
		return true;
	}
	return typeof $(element).get(0)[event] !== 'undefined';
};