$(document).ready(function() {

 /**
  * We are loading the stored guideline.json file, which
  * is a list of test names.
  */
 $.getJSON('data/guideline.json', function(guideline) {
   $('body').append('<div id="enable-accessibility"><a href="#">Turn on accessibility tests</a></div>');
   $('#enable-accessibility a').click(function() {
     var $link = $(this);
     $('#content').quail({ guideline : guideline,
      jsonPath : '../../src/resources',
      testFailed : function(event) {
        event.element.addClass('quail-result')
                     .addClass(event.severity);
      },
      complete : function(results) {
        $.post('stats.php', results.totals);
        $link.html('Done checking. Severe errors: <strong>' +
                   results.totals.severe +
                   '</strong> Moderate: <strong>' +
                   results.totals.moderate +
                   '</strong> Suggestions: <strong>' +
                   results.totals.suggestion +
                   '</strong>');
      }
      });
   });
   $('#edit').keyup(function() {
       var $text = $('<div>' + $(this).val() + '</div>');
       $text.quail({ guideline : guideline,
        jsonPath : '../../src/resources',
        reset : true,
        testFailed : function(event) {
          if(event.severity == 'severe') {
            $(':submit').addClass('disabled')
                        .attr('disabled', 'disabled')
                        .css('background', 'red');
            $('#edit').after('Hey, you have a problem!');
          }
        },
        complete : function(results) {
          console.log(results);
          if(results.totals.severe == 0) {
            $(':submit').removeClass('disabled')
                        .removeAttr('disabled');            
          }
        }
        });
     });
 });
});
