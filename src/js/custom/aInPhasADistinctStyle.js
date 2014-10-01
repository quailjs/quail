quail.aInPhasADistinctStyle = function( quail, test, Case ) {
  test.get( '$scope' ).find( 'p a' ).each( function() {
    var _case = test.add( Case( {
      element: this
    } ) );
    var expected = $( this ).closest( '.quail-test' ).data( 'expected' );

//    if (!$(this ).attr('href') || quail.cleanString($(this).attr('href')) === "" ) {
    _case.set( {
      'expected': expected,
      'status': 'inapplicable'
    } );
//    }

  } );
};
