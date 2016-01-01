var Case = require('Case');
const DOM = require('DOM');
var ImgMapAreasHaveDuplicateLink = {
  run: function (test) {
    var links = {};
    DOM.scry('a', test.get('scope')).forEach(function (element) {
      links[DOM.getAttribute(element, 'href')] = DOM.getAttribute(element, 'href');
    });
    DOM.scry('img[usemap]', test.get('scope')).forEach(function (element) {
      var _case = Case({
        element: element
      });
      test.add(_case);
      var $image = element;
      var $map = DOM.scry(DOM.getAttribute($image, 'usemap'), test.get('scope'));
      if (!$map.length) {
        $map = DOM.scry('map[name="' + DOM.getAttribute($image, 'usemap').replace('#', '') + '"]', test.get('scope'));
      }
      if ($map.length) {
        var failed = false;
        DOM.scry('area', $map).forEach(function (element) {
          if (typeof links[DOM.getAttribute(element, 'href')] === 'undefined') {
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
