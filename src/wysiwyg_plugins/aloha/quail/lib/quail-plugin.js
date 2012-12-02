

define(['aloha', 'jquery', 'aloha/plugin', 'quail/vendor/tipsy',  'css!quail/css/quail'],
function( Aloha, jquery, plugin, tipsy ) {
  
	return plugin.create( 'quail', {
	  
	  
	  init : function() {
  	  Aloha.bind('aloha-smart-content-changed', this.checkContent);
  		Aloha.bind('aloha-editable-activated', this.checkContent);
  		Aloha.bind('aloha-editable-deactivated', this.makeClean);
	  },
	  
	  checkContent : function(event) {
  	  var settings = { guideline : Aloha.settings.quail.guideline,
	                      jsonPath : Aloha.settings.quail.path,
	            accessibilityTests : Aloha.settings.quail.tests
	                 };
  	  if(typeof Aloha.settings.quail.testFailed === 'undefined') {
    	  settings.testFailed = function(event) {  	                    
          var title = Aloha.settings.quail.title(event);
  	      event.element.addClass('quail-result')
               .addClass(event.severity)
               .attr('title', title)
               .tipsy({html : title});
    	  }
    	 }
      else {
        settings.testFailed = Aloha.settings.quail.testFailed;
      }
	  
  	  jquery('.aloha-editable-active').quail(settings);
	  },
	  
	  makeClean : function() {
  	  jquery('.aloha-editable .quail-result').each(function() {
      		jquery(this).removeClass('quail-result')
                		  .removeClass('severe')
                		  .attr('original-title', '')
                		  .removeAttr('original-title');
       });
	  }
	  
	});

});