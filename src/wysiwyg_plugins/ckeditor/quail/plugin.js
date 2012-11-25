CKEDITOR.plugins.add( 'quail',
{
	init: function( editor )
	{
		editor.addCommand( 'checkQuail',
			{
				exec : function( editor )
				{    
					console.log(editor);
				}
			});
		editor.ui.addButton( 'Quail',
		{
			label: 'Check content for accessibility',
			command: 'checkQuail',
			icon: this.path + 'img/quail.png'
		} );
	}
} );