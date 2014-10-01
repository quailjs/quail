quail.aInPHasADistinctStyle = function( quail, test, Case ) {

  window.console.log(quail);

  test.get( '$scope' ).find( 'p a' ).each( function() {
    window.console.log(test.get("$scope"));
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
