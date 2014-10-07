quail.linkHasAUniqueContext = function( quail, test, Case ) {

  var counter = 0;

  test.get( '$scope' ).each( function() {

    var testableElements = $( this ).find( 'a' );


    if ( testableElements.length === 0 ) {

      var _case = Case( {
        element: this,
        status: 'inapplicable',
        expected: $( this ).closest( '.quail-test' ).data( 'expected' )
      } );
      test.add( _case );
    } else {

      testableElements.each( function() {
        var _case = Case( {
          element: this,
          expected: $( this ).closest( '.quail-test' ).data( 'expected' )
        } );
        test.add( _case );


        window.console.log(similarStrings("(READ MORE!)", "Read &nbsp; more..."));

        counter++;

        if (
          ($( this ).find( 'img' ) && $( this ).find( 'img' ).attr( 'alt' ) !== $( this ).text()) ||
          ($( this ).attr( 'title' ) !== 'undefined' && $( this ).attr( 'title' ) !== $( this ).text()) ||
          ($( this ).parent().text() !== "" && $( this ).parent().text() !== $( this ).text()) ||
          $( this ).next( 'a' ).text() !== $( this ).text() ||
          $( this ).prev().not( 'br' )
          ) {
          _case.set( {
            'status': 'passed'
          } );

          window.console.log( counter, "passed", $( this ), $( this ).next( 'a' ).text(), $( this ).text() );
          return;
        } else {
          _case.set( {
            'status': 'false'
          } );

          window.console.log( counter, "failed", $( this ), $( this ).next( 'a' ).text(), $( this ).text() );
          return;
        }

      } );
    }
  } );

  /*
   * Functions for testing string similarity
   */
  function similarStrings( stringA, stringB ) {
    var string1 = stringA.toLowerCase().replace( /\s/g, "".toLowerCase() );
    var string2 = stringB.toLowerCase().replace( /\s/g, "".toLowerCase() );


    var similarity_number = 2 * stringIntersect( pairs( string1 ), pairs( string2 ) ).length;
    var similarity_density = pairs( string1 ).length + pairs( string2 ).length;
    var similarity = similarity_number / similarity_density;

    return similarity;
  }


  function stringIntersect( array1, array2 ) {
    var a = [];
    var o = {};
    var l = array2.length;
    var v;
    var i;

    for ( i = 0; i < l; i++ ) {
      o[array2[i]] = true;
    }

    l = array1.length;
    for ( i = 0; i < l; i++ ) {
      v = array1[i];
      if ( v in o ) {
        a.push( v );
      }
    }
    return a;
  }

  function pairs( string ) {
    var pairsArray = [];
    for ( var i = 0; i < string.length - 1; i++ ) {
      pairsArray[i] = string.slice( i, i + 2 );
    }
    return pairsArray;
  }
};