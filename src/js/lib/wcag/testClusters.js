quail.lib.wcag2.TestCluster = (function () {
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


	/**
	 * Get an array of elements common to all tests provided
	 * @param  {Object} tests
	 * @return {Array}        Array of HTML elements
	 */
	function getCommonElements(tests) {
		var common = [],
		map = [];

		$.each(tests, function (i, test) {
			var elms = [];
			test.each(function () {
				elms.push(this.get('element'));
			});
			map.push(elms);
		});
		$.each(map, function (i, arr) {
			if (i === 0) {
				common = arr;
				return;
			}
			var newArr = [];
			$.each(arr, function (i, val) {
				if (common.indexOf(val) !== -1) {
					newArr.push(val);
				}
			});
			common = newArr;
		});
		return common;
	}

	

	function mergeCaseWithAssert(result, assert, test) {
		var outcome = assert.outcome;		
		outcome.result = result;
		outcome.info = test.get('title');
	}

	function constructor(config, testDefinitions) {
		var cluster = $.extend({
			id: config.tests.join('+')
		}, config);

		function getCombinedResults(tests) {
			var elms = getCommonElements(tests),
			asserts = [];

			// Create asserts for each element
			$.each(elms, function (i, elm) {
				var assert = $.extend({
					testCase: cluster.id,
					outcome: {
						result: 'failed',
					}
				}, defaultAssert);

				if (elm) { // Don't do undefined pointers
					assert.outcome.pointer = elm;
				}
				asserts.push(assert);
			});

			// Iterate over all results to build the assert
			$.each(tests, function (i, test) {
				test.each(function () {
					// Look up the assert, if any
					var indexCurr, indexNew, newResult,
					assert = asserts[elms.indexOf(
						this.get('element')
					)];
					// Ignore elements for which no assert is known
					if (!assert) {
						return;
					}

					// Allow the cluster to override the results
					newResult = this.get('status');
					if (cluster.log) {
						console.log(newResult, cluster[newResult]);
					}
					if (cluster[newResult]) {
						newResult = cluster[newResult];
					}

					indexCurr = statusOptions.indexOf(
						assert.outcome.result);
					indexNew = statusOptions.indexOf(newResult);

					if (indexCurr >= indexNew) {
						mergeCaseWithAssert(newResult, assert, test);
					}
				});
			});

			return asserts;
		}

		cluster.tests = $.map(cluster.tests, function (test) {
			return testDefinitions[test];
		});

		/**
		 * Filter the data array so it only contains results 
		 * from this cluster
		 * @param  {Array} data
		 * @return {Array}
		 */
		cluster.filterDataToTests = function (data) {
			var names = $.map(cluster.tests, function (test) {
				return test.name;
			}),
			testData = [];

			$.each(data, function (i, result) {
				if (names.indexOf(result.get('name')) !== -1) {
					testData.push(result);
				}
			});

			return testData;
		};

		cluster.getResults = function (tests) {
			var asserts;
			tests = cluster.filterDataToTests(tests);
			if (tests.length === 1 ||
			cluster.type === 'combined') {
				asserts = getCombinedResults(tests);

				// Return a default assert if none was defined
				if (asserts.length === 0) {
					asserts.push($.extend({
						testCase: cluster.id,
						outcome: {
							result: 'notApplicable'
						}
					}, defaultAssert));
				}
				return asserts;
			} else if (cluster.type === "stacking") {
				console.log("TODO: Build stacking");
				
			} else {
				console.error("Unknown type for cluster " +
					cluster.id);
			}
		};

		return cluster;
	}

	return constructor;
}());