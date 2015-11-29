/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');

var NewWindowStringsComponent = require('NewWindowStringsComponent');

var AreaDontOpenNewWindow = {
  run: function (test) {
    // Links without a target attribute pass.
    test.get('$scope').find('area').not('[target=_new], [target=_blank]').each(function () {
      test.add(Case({
        element: this,
        status: 'passed'
      }));
    });
    // Links with a target attribute pass if the link text indicates that the
    // link will open a new window.
    test.get('$scope').find('area[target=_new], area[target=_blank]').each(function () {
      var $link = $(this);
      var passes = false;
      var i = 0;
      var text = $link.text() + ' ' + $link.attr('title');
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
          element: this,
          status: 'passed'
        }));
      }
      else {
        test.add(Case({
          element: this,
          status: 'failed'
        }));
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'No \"area\" elements should open a new window without warning',
      nl: '\"area\"-elementen mogen geen nieuw scherm openen zonder melding'
    },
    description: {
      en: 'No <code>area</code> elements should open a new window without warning.',
      nl: '<code>area</code>-elementen mogen geen nieuw scherm openen zonder dat de gebruiker hiervan een melding krijgt.'
    },
    guidelines: [

    ],
    tags: [
      'imagemap',
      'content'
    ]
  }
};
module.exports = AreaDontOpenNewWindow;
