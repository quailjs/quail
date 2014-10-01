quail.aInPHasADistinctStyle = function( quail, test, Case ) {

  function hasBorder( element ) {
    if ( (element.outerWidth() - element.innerWidth() > 0) || (element.outerHeight() - element.innerHeight() > 0) ) {
      return true;
    }
    else {
      return false;
    }
  };

  test.get( '$scope' ).find( 'p a' ).each( function() {
    var _case = Case( {
      element: this,
      expected: $( this ).closest( '.quail-test' ).data( 'expected' )
    } );

    test.add( _case );
    var expected = $( this ).closest( '.quail-test' ).data( 'expected' );


    if ( !$( this ).attr( 'href' ) || quail.cleanString( $( this ).attr( 'href' ) ) === "" ) {
      _case.set( {
        'expected': expected,
        'status': 'inapplicable'
      } );
      return;
    }

    if (
      $( this ).css( 'text-decoration' ) === 'underline' ||
      $( this ).css( 'display' ) === 'block' ||
      ($( this ).css( 'background-color' ) !== 'rgba(0, 0, 0, 0)' && $( this ).css( 'background-color' ) !== $( this ).closest( 'p' ).css( 'background-color' )) ||
      hasBorder( $( this ) ) ||
      $( this ).children( 'img' ).length > 0
      ) {
      _case.set( {
        'expected': expected,
        'status': 'passed'
      } );
      return;
    } else {
      _case.set( {
        'expected': expected,
        'status': 'failed'
      } );
      return;
    }

  } );
}
;
