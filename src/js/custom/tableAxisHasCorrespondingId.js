quail.tableAxisHasCorrespondingId = function() {
	quail.html.find('[axis]').each(function() {
		if($(this).parents('table:first').find('th#' + $(this).attr('axis')).length === 0) {
			quail.testFails('tableAxisHasCorrespondingId', $(this));
		}
	});
}