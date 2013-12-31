(function($) {
  CKEDITOR.plugins.add( 'quail',
  {
    
    active : false,
    
    init: function( editor )
    {
      var that = this;
      
      CKEDITOR.addCss('.quail-result { padding: 3px; border-radius: 3px;}' +
  '.quail-result.severe { border: 3px dashed red; }' +
  '.quail-result.moderate { border: 3px dashed orange; }' +
  '.quail-result.reccomendation { border: 3px solid green; }' +

  '.quail-message { position: fixed; background: #fff; color: #000 !important; text-decoration: none !important; border: 1px solid black; padding: 10px;}');
      
      editor.addCommand( 'checkQuail',
        {
          exec : function( editor )
          {
            if(that.active) {
              that.removeMarkup(editor);
              that.active = false;
            }
            else {
              that.checkContent(editor);
              that.active = true;
            }
          }
        });
      
      editor.ui.addButton( 'Quail',
      {
        label: 'Check content for accessibility',
        command: 'checkQuail',
        icon: this.path + 'img/quail.png'
      });
    },
    
    removeMarkup : function(editor) {
  		$(editor.document.getDocumentElement().$).find('.quail-result').each(function() {
    		$(this).removeClass('quail-result')
    		       .removeClass('severe')
    		       .removeClass('moderate')
    		       .removeClass('suggestion')
    		       .unbind('hover');
  		});
  		$(editor.document.getDocumentElement().$).find('.quail-message').remove();
    },
    
    checkContent : function(editor) {
      var options = editor.config.quailOptions;
      if(typeof options.testFailed !== 'object') {
        options.testFailed = function(event) {
          event.element.addClass('quail-result')
                       .addClass(event.severity);
          if(typeof(options.ckEditorMessage === 'object')) {
            var message = options.ckEditorMessage(event);
            event.element.hover(function() {
              var $message =  $('<div class="quail-message">' + message + '</div>');
              var position = event.element.position();
              $message.css('top', position.top + 5 + 'px')
                      .css('left', position.left + event.element.width() + 5 + 'px');
              event.element.after($message);
            },
            function() {
              event.element.next('.quail-message').remove();
            });
           
          }
        };
      }
      $(editor.document.getDocumentElement().$).quail(options);
    }
  });
})(jQuery);