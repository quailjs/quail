
quail.lib.wcag2.TestCluster = (function () {
	var defaultAssert = {
		type: 'assert',
		subject: '',
		assertedBy: '',
		mode: 'automated'
	};
	
	function constructor(config, testDefinitions) {
		var cluster = $.extend({}, config);

		if (!$.isArray(cluster.tests)) {
			window.console.log(cluster, config);
		}
		cluster.tests = $.map(cluster.tests, function (test) {
			return testDefinitions[test];
		});

		cluster.getResult = function () {
			return $.extend({}, defaultAssert);
		};

		return cluster;
	}

	return constructor;
}());