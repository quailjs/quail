quail.audioMayBePresent=function(quail, test, Case){
  var audioExtensions = ['mp3', 'm4p', 'ogg', 'oga', 'opus', 'wav', 'wma', 'wv'];

  test.get('$scope').each(function() {
    var $this = $(this);
    var hasCase = false; // Test if a case has been created

    // Audio is definately an audio, and objects could be too.
    $this.find('object, audio').each(function () {
      hasCase = true;
      test.add(Case({
        element: this,
        expected: $(this).closest('.quail-test').data('expected'),
        status: 'cantTell'
      }));
    });

    // Links refering to files with an audio extensions are good indicators too
    $this.find('a[href]').each(function () {
      var $this = $(this);
      var extension = $this.attr('href').split('.').pop();
      if ($.inArray(extension, audioExtensions) !== -1) {
        hasCase = true;
        test.add(Case({
          element: this,
          expected: $this.closest('.quail-test').data('expected'),
          status: 'cantTell'
        }));
      }
    });

    // if no case was added, return inapplicable
    if (!hasCase) {
      test.add(Case({
        element: this,
        status: 'inapplicable',
        expected: $(this).closest('.quail-test').data('expected')
      }));
    }
  });

};