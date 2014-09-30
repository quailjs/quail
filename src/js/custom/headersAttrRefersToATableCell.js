quail.headersAttrRefersToATableCell = function( quail, test, Case ) {

  // Table cell headers without referred ids
  test.get( '$scope' ).find( 'td, th' ).each( function() {

    var _case = Case({
      element: this,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    if ( !$( this ).attr( 'headers' )) {
      _case.set( {
        'status': 'inapplicable'
      } );
      return; // Stop each loop
    }

    if ( $( this ).attr( 'headers' )) {
      _case.set( {
        'status': 'passed'
      } );
    }  else{
      _case.set( {
        'status': 'failed'
      } );
    }


  } );
};
