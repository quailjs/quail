quail.idrefsHasCorrespondingId = function( quail, test, Case ) {

  test.get( '$scope' ).each( function() {

      var $local = $( this );
      var testableElements = $local.find( 'td[headers], th[headers], [aria-controls], [aria-describedby], [aria-flowto], [aria-labelledby], [aria-owns]' );

      if ( testableElements.length === 0 ) {
        window.console.log( "No testable elements in this test" );
        test.add( Case( {
          element: this,
          expected: $( this ).closest( '.quail-test' ).data( 'expected' ),
          status: 'inapplicable'
        } ) );
        return;
      }
      else {

        testableElements.each( function() {

          var _case = test.add( Case( {
            element: this,
            expected: $( this ).closest( '.quail-test' ).data( 'expected' )
          } ) );

          if ( $( this ).val() === "poep" ) {
            window.console.log( $( this ).val() );
            _case.set( {
              'status': 'passed'
            } );
          }else{
            _case.set( {
              'status': 'failed'
            } );
          }
        } );
        return;
      }

    }
  );
};
