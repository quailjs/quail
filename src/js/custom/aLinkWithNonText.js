quail.aLinkWithNonText = function() {
	quail.html.find('a:has(img, object, embed)').each(function() {
		if(!quail.isUnreadable($(this).text())) {
			return;
		}
		var unreadable = 0;
		$(this).find('img, object, embed').each(function() {
			if(($(this).is('img') && quail.isUnreadable($(this).attr('alt'))) ||
				(!$(this).is('img') && quail.isUnreadable($(this).attr('title')))) {
				unreadable++;
			}
		});
		if($(this).find('img, object, embed').length === unreadable) {
			quail.testFails('aLinkWithNonText', $(this));
		}
	});
};