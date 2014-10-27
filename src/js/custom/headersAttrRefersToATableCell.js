quail.headersAttrRefersToATableCell = function( quail, test, Case ) {

  // Table cell headers without referred ids
<<<<<<< HEAD
  test.get( '$scope' ).find( 'td, th' ).each( function() {

    var $this = $(this),
      _case = Case({
      element: this,
      expected: $this.closest('.quail-test').data('expected')
    });
    test.add(_case);

    if ( !$this.attr( 'headers' )) {
=======
  test.get( '$scope' ).find( 'table' ).each( function() {

    var element = this;
    var _case = Case( {
        element: element,
        expected: $( this ).closest( '.quail-test' ).data( 'expected' )
      } );
    test.add( _case );


    if ( $( element ).find( '[headers]' ).length === 0 ) {
>>>>>>> origin/feature/headersAttrRefersToATableCell
      _case.set( {
        'status': 'inapplicable'
      } );
      return;
<<<<<<< HEAD
    }

    var headers = $this.attr('headers').split(/\s+/);
    var table = $this.closest('table');
    $.each(headers, function(index, item) {
      if (table.find('th#' + item + ',td#' + item).length > 0) {
        _case.set({
          'status': 'passed'
        });
      } else {
        _case.set({
          'status': 'failed'
        });
      }
    });
  });
=======
    } else {
      $( element ).find( 'th[headers], td[headers]' ).each( function() {
        var headers = $( this ).attr( 'headers' ).split( /\s+/ );
        $.each( headers, function( index, item ) {
          if (item === "" || $( element ).find( 'th#' + item + ',td#' + item ).length > 0 ) {
            _case.set( {
              'status': 'passed'
            } );
            return;
          } else {
            _case.set( {
              'status': 'failed'
            } );
            return;
          }
        } );
      } );
    }
  } );
>>>>>>> origin/feature/headersAttrRefersToATableCell
};
