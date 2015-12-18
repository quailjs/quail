/**globals console:true */
var Case = require('Case');

var SkipContentStringsComponent = require('SkipContentStringsComponent');

var SkipToContentLinkProvided = {
  run: function (test) {
    test.get('scope').each(function () {
      var $local = $(this);
      var skipLinkFound = false;

      DOM.scry('a[href*="#"]', $local).each(function () {
        if (skipLinkFound) {
          return;
        }
        var $link = $(this);

        var fragment = $link.attr('href').split('#').pop();
        var $target = $local.find('#' + fragment);
        var strs = SkipContentStringsComponent.slice();
        while (!skipLinkFound && strs.length) {
          var str = strs.pop();
          if ($link.text().search(str) > -1 && $target.length) {
            $link.focus();
            if ($link.is(':visible') && $link.css('visibility') !== 'hidden') {
              skipLinkFound = true;
              test.add(Case({
                element: $link.get(0),
                status: 'passed'
              }));
              return;
            }
            $link.blur();
          }
        }
      });
      if (!skipLinkFound) {
        test.add(Case({
          status: 'failed'
        }));
      }
    });
  },

  meta: {
    testability: 0.5,
    title: {
      en: 'A \"skip to content\" link should exist as one of the first links on the page',
      nl: 'Er moet een \"skip to content\"-link zijn als een van de eerste links op de pagina'
    },
    description: {
      en: 'A link reading \"skip to content\" should be the first link on a page.',
      nl: 'Er moet een link zijn om naar de content te navigeren als een van de eerste links op de pagina.'
    },
    guidelines: {
      508: [
        'o'
      ],
      wcag: {
        '2.4.1': {
          techniques: [
            'G1'
          ]
        }
      }
    },
    tags: [
      'document'
    ]
  }
};
module.exports = SkipToContentLinkProvided;
