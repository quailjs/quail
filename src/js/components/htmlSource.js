quail.components.htmlSource = function(callback) {
	if(typeof quail.options.htmlSource !== 'undefined' && quail.options.htmlSource) {
		callback(quail.options.htmlSource);
		return;
	}
	var html = '';
	$.get(window.location.href, function(data) {
		callback(data);
	});
};
