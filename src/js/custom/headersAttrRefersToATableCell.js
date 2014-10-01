quail.headersAttrRefersToATableCell = function( quail, test, Case ) {

  // Table cell headers without referred ids
  test.get( '$scope' ).find( 'td, th' ).each( function() {

    var element = this,
      _case = Case({
      element: element,
      expected: $(this).closest('.quail-test').data('expected')
    });
    test.add(_case);

    if ( !$( element ).attr( 'headers' )) {
      _case.set( {
        'status': 'inapplicable'
      } );
      return;
    }

    var headers = $(element).attr('headers').split(/\s+/);

    $.each( headers, function( index, item ) {
      if ( $( element ).closest( 'table' ).find( 'th#' + item + ',td#' + item ).length > 0  ) {
        _case.set( {
          'status': 'passed'
        } );
      } else {
        _case.set( {
          'status': 'failed'
        } );
      }
      window.console.log($( element ).closest( 'div' ).attr('data-expected'),_case.attributes.expected,_case.attributes.expected);
    });


  } );
};
