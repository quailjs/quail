quail.headersAttrRefersToATableCell = function( quail, test, Case ) {

  // Table cell headers without referred ids
  test.get( '$scope' ).find( 'td, th' ).each( function() {

    var $this = $(this),
      _case = Case({
      element: this,
      expected: $this.closest('.quail-test').data('expected')
    });
    test.add(_case);

    if ( !$this.attr( 'headers' )) {
      _case.set( {
        'status': 'inapplicable'
      } );
      return;
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
};
