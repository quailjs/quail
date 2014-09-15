/* A logical combo of Techniques and the intersection of their outcomes. */
quail.lib.wcag2 = (function () {
	'use strict';

	/**
	 * Run Quail using WCAG 2
	 * @param  {[object]} options Quail options
	 */
	function runWCAG20Quail(options) {
		var opt = {
			async : false,
			dataType : 'json'
		};

		// Load the required json files
		$.when(
			$.ajax(options.jsonPath + '/wcag2.json', opt),
			$.ajax(options.jsonPath + '/tests.json', opt))

		// Setup quail given the tests described in the json files
		.done(function (wcag2Call, testsCall) {
			var criteria = wcag2Call[0],
				testData = testsCall[0],
				accessibilityTests = {};
			
			// Create the accessibiliyTests object, based on the
			// tests in the criteria
			$.each(getTestsFromCriteria(criteria),
			function (i, testName) {
				accessibilityTests[testName] = testData[testName];
			});

			// Run quail with the tests instead of the guideline
			$(quail.html).quail({
				accessibilityTests: accessibilityTests,
				// Have wcag2 intercept the callback
				complete: createCallback(criteria, options.complete)
			});
		});
	}

	/**
	 * Get a list of all test names given the provided criteria
	 * @param  {[json]} criteria
	 * @return {[array]}
	 */
	function getTestsFromCriteria(criteria) {
		var tests = [];

		$.each($.map(criteria, function (criterion) {
			return criterion.testClusters;

		}), function (i, cluster) {
			tests.push.apply(tests, cluster.tests);
		});

		return $.unique(tests);
	}


	function createCallback(criteria, callback) {
		window.console.log('Quail started');

		return function (event) {
			window.console.log('Quail finished');
			callback(event);
		};
	}


	return {
		run: runWCAG20Quail
	};

}());