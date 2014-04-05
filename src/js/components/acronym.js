quail.components.acronym = function(quail, test, Case) {
  test.get('$scope').each(function() {
    var $scope = $(this);
    var alreadyReported = { };
    var predefined = { };

    // Find defined acronyms within this scope.
    $scope.find('acronym[title], abbr[title]').each(function() {
      predefined[$(this).text().toUpperCase().trim()] = $(this).attr('title');
    });

    // Consider all block-level html elements that contain text.
    $scope.find('p, div, h1, h2, h3, h4, h5').each(function(){
      var el = this;
      var $el = $(el);

      var words = $el.text().split(' ');
      // Keep a list of words that might be acronyms.
      var infractions = [];
      // If there is more than one word and ??.
      if (words.length > 1 && $el.text().toUpperCase() !== $el.text()) {
        // Check each word.
        $.each(words, function(index, word) {
          // Only consider words great than one character.
          if (word.length < 2) {
            return;
          }
          // Only consider words that have not been predefined.
          // Remove any non-alpha characters.
          word = word.replace(/[^a-zA-Zs]/, '');
          // If this is an uppercase word that has not been defined, it fails.
          if (word.toUpperCase() === word && typeof predefined[word.toUpperCase().trim()] === 'undefined') {
            if (typeof alreadyReported[word.toUpperCase()] === 'undefined') {
              infractions.push(word);
            }
            alreadyReported[word.toUpperCase()] = word;
          }
        });
        // If undefined acronyms are discovered, fail this case.
        if (infractions.length) {
          test.add(Case({
            element: el,
            expected: $el.closest('.quail-test').data('expected'),
            info: {acronyms : infractions},
            status: 'failed'
          }));
        }
        else {
          test.add(Case({
            element: el,
            expected: $el.closest('.quail-test').data('expected'),
            status: 'passed'
          }));
        }
      }
      else {
        test.add(Case({
          element: el,
          expected: $el.closest('.quail-test').data('expected'),
          status: 'passed'
        }));
      }
    });

  });
};
