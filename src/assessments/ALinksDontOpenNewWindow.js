var Case = require('Case');
const DOM = require('DOM');
var NewWindowStringsComponent = require('NewWindowStringsComponent');
var ALinksDontOpenNewWindow = {
  run: function (test) {
    // Links without a target attribute pass.
    test.get('scope').forEach((scope) => {
      let links = DOM.scry('a', scope);
      let passLinks = [];
      let checkLinks = []
      links.forEach((link) => {
        let target = DOM.getAttribute(link, 'target');
        if (['_new', '_blank'].indexOf(target) > -1) {
          checkLinks.push(link);
        }
        else {
          passLinks.push(link);
        }
      });
      passLinks.forEach(function (element) {
        test.add(Case({
          element: element,
          status: 'passed'
        }));
      });
      // Links with a target attribute pass if the link text indicates that the
      // link will open a new window.
      checkLinks.forEach(function (element) {
        var $link = element;
        var passes = false;
        var i = 0;
        var text = DOM.text($link) + ' ' + DOM.getAttribute($link, 'title');
        var phrase = '';
        // Test the link text against strings the indicate the link will open
        // in a new window.
        do {
          phrase = NewWindowStringsComponent[i];
          if (text.search(phrase) > -1) {
            passes = true;
          }
          ++i;

        } while (!passes && i < NewWindowStringsComponent.length);
        // Build a Case.
        if (passes) {
          test.add(Case({
            element: element,
            status: 'passed'
          }));
        }
        else {
          test.add(Case({
            element: element,
            status: 'failed'
          }));
        }
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Links should not open a new window without warning',
      nl: 'Met links open je geen nieuw scherm zonder melding'
    },
    description: {
      en: 'Links which open a new window using the \"target\" attribute should warn users.',
      nl: 'Voordat links door middel van het \"target\"-attribuut een nieuw scherm openen moet de gebruiker een melding hiervan krijgen.'
    },
    guidelines: {
      wcag: {
        '3.2.5': {
          techniques: [
            'H83',
            'SCR24'
          ]
        }
      }
    },
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = ALinksDontOpenNewWindow;
