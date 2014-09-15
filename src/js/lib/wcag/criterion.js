quail.lib.wcag2.Criterion = (function () {
	// Provide default values for the assert objects
	var defaultAssert = {
		type: 'assert',
		subject: '',
		assertedBy: '',
		mode: 'automated'
	};

	function aggregateParts() {
		var outcome = {
			result: 'untested'
		};
		return outcome;
	}


	function constructor (data, testDefinitions) {
		var testClusters = [],
		criterion = {},
		id = data.id;

		// Create a testCluster object for each cluster (if any)
		if ($.isArray(data.testClusters)) {
			testClusters = $.map(data.testClusters, function (clusterConf) {
				return new quail.lib.wcag2.TestCluster(
					clusterConf, testDefinitions
				);
			});
		}


		criterion.getResult = function () {
			var parts;

			parts = $.map(testClusters, function (cluster) {
				return cluster.getResult();
			});

			return $.extend({
				testRequirement: id,
				outcome: aggregateParts(parts),
				hasPart: parts
			}, defaultAssert);
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
