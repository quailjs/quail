quail.lib.wcag2.Criterion = (function () {
	// Provide default values for the assert objects
	var defaultAssert = {
		// type: 'assert',
		// subject: '',
		// assertedBy: '',
		// mode: 'automated'
	};

	var statusOptions = [
		'untested', 'notApplicable', 'passed',
		'cantTell', 'failed'
	];

	function aggregateParts(parts, defaultResult) {
		var outcome = {
			result: defaultResult
		};
		
		$.each(parts, function (i, part) {
			var indexCurr, indexNew;
			indexCurr = statusOptions.indexOf(outcome.result);
			indexNew = statusOptions.indexOf(part.outcome.result);
			if (indexCurr < indexNew) {
				outcome.result = part.outcome.result;
			}
		});
		return outcome;
	}


	function constructor (data, testDefinitions) {
		var testClusters = [],
		criterion = {},
		defaultResult = data.default || 'untested',
		id = data.id;

		// Create a testCluster object for each cluster (if any)
		if ($.isArray(data.testClusters)) {
			testClusters = $.map(data.testClusters, function (clusterConf) {
				return new quail.lib.wcag2.TestCluster(
					clusterConf, testDefinitions
				);
			});
		}


		criterion.getResult = function (data) {
			var result,
			parts = [];

			$.each(testClusters, function (i, cluster) {
				var part = cluster.getResults(data);
				parts.push.apply(parts, part);

				// This is for debugging only
				if (cluster.log) {
					console.log(id, part);
				}
			});

			result = $.extend({
				testRequirement: id,
				outcome: aggregateParts(parts, defaultResult)
			}, defaultAssert);
			if (parts.length > 0) {
				result.hasPart = parts;
			}
			return result;
		};

		/**
		 * Get an array of test used in this criterion
		 * @param  {[json]} criteria
		 * @return {[array]}
		 */
		criterion.getTests = function () {
			var tests = [];
			$.each(testClusters, function (i, cluster) {
				tests.push.apply(tests, cluster.tests);
			});
			return tests;
		};

		return criterion;
	}

	return constructor;

}());
