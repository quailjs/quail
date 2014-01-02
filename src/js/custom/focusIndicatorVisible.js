quail.focusIndicatorVisible = function() {
	quail.html.find(quail.focusElements).each(function() {
		var noFocus = {
			borderWidth : $(this).css('border-width'),
			borderColor : $(this).css('border-color'),
			backgroundColor : $(this).css('background-color'),
			boxShadow : $(this).css('box-shadow')
		};
		$(this).focus();
		if(noFocus.backgroundColor !== $(this).css('background-color')) {
			$(this).blur();
			return;
		}
		
		var borderWidth = quail.components.convertToPx($(this).css('border-width'));
		if(borderWidth > 2 && borderWidth !== quail.components.convertToPx(noFocus.borderWidth)) {
			$(this).blur();
			return;
		}
		
		var boxShadow = ($(this).css('box-shadow') && $(this).css('box-shadow') !== 'none') ? $(this).css('box-shadow').match(/(-?\d+px)|(rgb\(.+\))/g) : false;
		if(boxShadow && $(this).css('box-shadow') !== noFocus.boxShadow && quail.components.convertToPx(boxShadow[3]) > 3) {
			$(this).blur();
			return;
		}
		$(this).blur();
		quail.testFails('focusIndicatorVisible', $(this));
	});
};