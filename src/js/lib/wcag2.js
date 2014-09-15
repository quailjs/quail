/* A logical combo of Techniques and the intersection of their outcomes. */
quail.lib.wcag2 = (function () {
	'use strict';

	function runWCAG20Quail(options) {
		$.ajax({
			url : options.jsonPath + '/wcag2.json',
			async : false,
			dataType : 'json',
			success : function (data) {
				window.console.log(options, options);
			},
			error : function () {
			  throw new Error('Tests could not be loaded');
			}
		});
	}

	return {
		run: runWCAG20Quail
	};

}());