define([
	'jquery',
	'aloha/core',
	'aloha/plugin',
	'block/block',
	'block/blockmanager',
	'ui/ui',
	'ui/toggleButton',
	'ui/toolbar',
	'css!quail/css/quail.css'
], function (
	$,
	Aloha,
	Plugin,
	Block,
	BlockManager,
	Ui,
	ToggleButton,
	Toolbar
) {

	var quail = Plugin.create('quail', {
		init: function () {
			
		},
		makeClean: function ($content) {
			
		}
	});

	return quail;
});
