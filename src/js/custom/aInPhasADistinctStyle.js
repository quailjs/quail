quail.aInPhasADistinctStyle = function( quail, test, Case ) {
  test.get( '$scope' ).find( 'p a' ).each( function() {
    var _case = Case( {
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    } );

    window.console.log("TEST");
    window.console.log(_case);

    test.add( _case );
    var expected = $( this ).closest( '.quail-test' ).data( 'expected' );

//    if (!$(this ).attr('href') || quail.cleanString($(this).attr('href')) === "" ) {
    _case.set( {
      'expected': expected,
      'status': 'inapplicable'
    } );
//    }

  } );
};
