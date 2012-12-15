(function($) {
  $(document).ready(function() {
    var messages = { imgHasAlt : 'Your images are missing alt text here. Better fix that.',
                     documentAbbrIsUsed : 'This abbreviation needs to be wrapped in an abbr or acronym tag.'
    }
    $('.demonstration').quail({jsonPath : '/js/quail/src/resources', 
                               guideline : [ 'imgHasAlt', 'documentAbbrIsUsed' ],
                               testFailed : function(event) {
          	                    if(event.testName == 'documentAbbrIsUsed') {
            	                    event.element.html(event.element.html().replace(event.options.acronym, '<span class="quail-result moderate" title="' + messages[event.testName] +'">' + event.options.acronym + '</span>'));
          	                    }
          	                    else {
            	                    event.element.addClass('quail-result')
          	                           .addClass(event.severity)
          	                           .attr('title', messages[event.testName]);
          	                    }
          	                    $('.quail-result').tooltip();
        	                    }});
    });
    if($('#tests').length) {
      $.getJSON('/js/quail/src/resources/tests.json', function(data) {
        $.each(data, function(index, test) {
          $('#tests tbody').append('<tr><td><a href="https://quail.readthedocs.org/en/latest/tests/' + index + '.html">' + index + '</a></td><td>' + test.type + '</td><td>' + test.severity +'</td></tr>');
        });
      });
    }
})(jQuery);