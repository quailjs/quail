/*global console:true*/
(function(global) {

	var testRunner = {
		accessibilityTests : {},

		qunitCallbacks : {},

		run: function() {
			var that = this;
			if(typeof QUnit === 'undefined') {
				global.QUnit = {
					moduleStart: function(callback) {
						that.qunitCallbacks.moduleStart = callback;
					},
					testStart: function(callback) {
						that.qunitCallbacks.testStart = callback;
					},
					testDone: function(callback) {
						that.qunitCallbacks.testDone = callback;
					},
					log: function(callback) {
						that.qunitCallbacks.log = callback;
					},
					done: function(callback) {
						that.qunitCallbacks.done = callback;
					}
				};
			}
			this.includejQuery();
		},

		includejQuery: function() {
			var em = document.createElement('script');
		  em.type = 'text/javascript';
		  if (em.readyState) {
		      em.onreadystatechange = function () {
		          if (em.readyState == "loaded" || em.readyState == "complete") {
		              em.onreadystatechange = null;
				         testRunner.includeScripts();
		          }
		      };
		  } else {
		      em.onload = function () {
		         testRunner.includeScripts();
		      };
		  }
		  em.src = '../../lib/jquery/jquery.js';
		  var s = document.getElementsByTagName('script')[0];
		  s.parentNode.insertBefore(em, s);
		},

		includeScripts: function() {
			var that = this;
			$('head').append('<link rel="stylesheet" href="../../lib/qunit/qunit.css" media="screen">');
			$('head').append('<link rel="stylesheet" href="../test.css" media="screen">');
			$('body').prepend('<div id="qunit"></div><div id="qunit-fixture"></div>');
			$.getScript('../../dist/quail.jquery.js', function() {
				$.getScript('../../lib/qunit/qunit.js', function() {
					$.ajax({ url: '../../dist/tests.json',
						      cache: false,
						      dataType: 'json',
						      success: function(data) {
										that.accessibilityTests = data;
										that.buildQUnit();
										QUnit.init();
										setTimeout(function() {
											start();
											if(typeof global.quailTest !== 'undefined') {
												global.quailTest();
											}
											else {
												that.runTests();
											}
										}, 250);
									}
					});
				});
			});
		},

		buildQUnit: function() {
			if(typeof this.qunitCallbacks.moduleStart === 'undefined') {
				return;
			}
			QUnit.moduleStart = this.qunitCallbacks.moduleStart;
			QUnit.testStart = this.qunitCallbacks.testStart;
			QUnit.testDone = this.qunitCallbacks.testDone;
			QUnit.log = this.qunitCallbacks.log;
			QUnit.done = this.qunitCallbacks.done;
		},

		runTests: function() {
			var that = this;
			$('.quail-test').each(function(index) {
				var thisTest = {
					title : ($(this).attr('title')) ? ': ' + $(this).attr('title') : '',
					accessibilityTest: $(this).data('accessibility-test'),
					expectedPass: ($(this).data('expected') === 'pass'),
				};
				if(typeof thisTest.accessibilityTest === 'undefined' ||
					 !thisTest.accessibilityTest) {
					test('Accessibility test is defined', function() {
						ok(false, 'Accessibility test is not defined.');
					});
				}
				var $that = $(this), expected, label, title;
				testTitle = (typeof that.accessibilityTests[thisTest.accessibilityTest].title !== 'undefined') ?
											that.accessibilityTests[thisTest.accessibilityTest].title.en :
											'No test title defined';
				$that.quail({
					jsonPath: '../../dist',
          guideline: [ thisTest.accessibilityTest ],
          accessibilityTests : that.accessibilityTests,
          reset: true,
          complete: function(event) {
	          if(window.location.href.search(/\?debug/) > -1) {
	          	console.log(event);
	          }
	          test(testTitle +  thisTest.title, function() {
	          	label = (thisTest.expectedPass) ? 'pass' : 'fail';
	        		$that.addClass(label)
	        			   .prepend('<span class="test-label">#' + (index + 1) + ' (' + label + ')</span>');
	        		if(thisTest.expectedPass) {
	        			ok(event.results[thisTest.accessibilityTest].elements.length === 0, 'No elements failed test');
	        		}
	        		else {
	        			if($that.hasClass('self-fail')) {
	        				ok(event.results[thisTest.accessibilityTest].elements.length > 0, 'Self testing element failed (document-wide test)');
	        			}
	        			else {
	        				$that.find('.quail-failed-element').each(function() {
		        				var found = this;
		        				expected = false;
		        				$.each(event.results[thisTest.accessibilityTest].elements, function(index, $element) {
		        					if($element.get(0) === found) {
		        						expected = true;
		        						$(found).addClass('found');
		        					}
		        				});
		        				if(!expected) {
		        					ok(false, 'Element not found:' + $('<div>').append($(found).clone().empty()).html());
		        				}
		        			});
			        		ok($that.find('.quail-failed-element').length === $that.find('.quail-failed-element.found').length, $that.find('.quail-failed-element').length + ' element(s) failed');	        				        				
	        			}
	        		}
	        	});
        	}
				});
			});
		}
	};
	
	testRunner.run();

})(this);