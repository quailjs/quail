quail.linkHasAUniqueContext = function( quail, test, Case ) {

//  if()
//  test.get( '$scope' ).find( 'a' ).each( function() {
//    var _case = Case( {
//      element: this,
//      expected: $( this ).closest( '.quail-test' ).data( 'expected' ),
//      status: 'inapplicable'
//    } );
//    test.add( _case );
//  } );

  test.get( '$scope' ).find( 'a' ).each( function() {
    var _case = Case( {
      element: this,
      expected: $( this ).closest( '.quail-test' ).data( 'expected' )
    } );
    test.add( _case );

    window.console.log( "LINK:", $( this ) );

    if (
      ($( this ).find( 'img' ) && $( this ).find( 'img' ).attr( 'alt' ) !== $( this ).text()) ||
      ($( this ).attr( 'title' ) !== 'undefined' && $( this ).attr( 'title' ) !== $( this ).text()) ||
      ($( this ).parent().text() !== "" && $( this ).parent().text() !== $( this ).text())
      ) {
      _case.set( {
        'status': 'passed'
      } );
      return;
    } else {
      _case.set( {
        'status': 'false'
      } );
      return;
    }
  } );
};
