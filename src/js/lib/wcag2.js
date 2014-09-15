/* A logical combo of Techniques and the intersection of their outcomes. */
quail.lib.wcag2 = (function () {
	'use strict';
	var ajaxOpt = {async: false, dataType: 'json'};

	/**
	 * Run Quail using WCAG 2
	 * @param  {[object]} options Quail options
	 */
	function runWCAG20Quail(options) {

		// Load the required json files
		$.when(
			$.ajax(options.jsonPath + '/wcag2.json', ajaxOpt),
			$.ajax(options.jsonPath + '/tests.json', ajaxOpt))

		// Setup quail given the tests described in the json files
		.done(function (wcag2Call, testsCall) {
			var criteria,
			allTests = [];

			criteria = $.map(wcag2Call[0], function (critData) {
				return new quail.lib.wcag2.Criterion(
					critData, testsCall[0]);
			});

			// Create the accessibiliyTests object, based on the
			// tests in the criteria
			$.each(criteria, function (i, criterion) {
				allTests.push.apply(allTests, criterion.getTests());
			});

			// Run quail with the tests instead of the guideline
			$(quail.html).quail({
				accessibilityTests: $.unique(allTests),
				// Have wcag2 intercept the callback
				testCollectionComplete: createCallback(
						criteria, options.testCollectionComplete)
			});
		});
	}


	function createCallback(criteria, callback) {
		return function (status, data) {
			if (status === 'complete') {
				data = $.map(criteria, function (criterion) {
					return criterion.getResult();
				});
			}

			callback(status, data);
		};
	}

	return {
		run: runWCAG20Quail
	};

}());