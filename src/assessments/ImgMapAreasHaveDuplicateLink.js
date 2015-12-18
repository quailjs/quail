var Case = require('Case');
var ImgMapAreasHaveDuplicateLink = {
  run: function (test) {
    var links = {};
    test.get('scope').find('a').each(function () {
      links[$(this).attr('href')] = $(this).attr('href');
    });
    test.get('scope').find('img[usemap]').each(function () {
      var _case = Case({
        element: this
      });
      test.add(_case);
      var $image = $(this);
      var $map = test.get('scope').find($image.attr('usemap'));
      if (!$map.length) {
        $map = test.get('scope').find('map[name="' + $image.attr('usemap').replace('#', '') + '"]');
      }
      if ($map.length) {
        var failed = false;
        $map.find('area').each(function () {
          if (typeof links[$(this).attr('href')] === 'undefined') {
            failed = true;
          }
        });
        _case.set({
          status: (failed) ? 'failed' : 'passed'
        });
      }
      else {
        _case.set({
          status: 'inapplicable'
        });
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All links within a client-side image are duplicated elsewhere in the document',
      nl: 'Alle links met een client-side afbeelding moeten elders in het document terugkeren'
    },
    description: {
      en: 'Any image that has a \"usemap\" attribute must have links replicated somewhere else in the document.',
      nl: 'Elke afbeelding met een \"usemap\"-attribuut moet een link elders in het document hebben.'
    },
    guidelines: {
      508: [
        'ef',
        'ef'
      ]
    },
    tags: [
      'image',
      'imagemap'
    ]
  }
};
module.exports = ImgMapAreasHaveDuplicateLink;
