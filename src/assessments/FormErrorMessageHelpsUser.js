/**
 * A simple test case that determines if elements, specified by a selector,
 * exist or not.
 *
 * The test fails for elements that are found and a case is created for each
 * one. The test passes is the selector finds no matching elements.
 */
var Case = require('Case');
const DOM = require('DOM');

var FormErrorMessageHelpsUser = {
  run: function (test) {

    var selector = 'form';

    test.get('scope').forEach(function (scope) {
      var candidates = DOM.scry(selector, scope);
      if (!candidates.length) {
        test.add(Case({
          element: undefined,
          status: 'inapplicable'
        }));
      }
      else {
        candidates.forEach(function (element) {
          test.add(Case({
            element: element,
            status: 'cantTell'
          }));
        });
      }
    });
  },

  meta: {
    testability: 0,
    title: {
      en: 'Forms offer the user a way to check the results of their form before performing an irrevocable action',
      nl: 'Formulieren bieden gebruikers de gelegenheid om hun formulier te controleren voor ze een onomkeerbare actie uitvoeren'
    },
    description: {
      en: 'If the form allows users to perform some irrevocable action, like ordreing a product, ensure that users have the ability to review the contents of the form they submitted first. This is not something that can be checked through automated testing and requires manual confirmation.',
      nl: 'Als een formulier een gebruiker toestaat om een onomkeerbare actie uit te voeren, zoals het bestellen van een product, zorg er dan voor dat ze eerst het formulier kunnen controleren. Dit kan niet met een automatische test en moet handmatig gecontroleerd en bevestigd worden.'
    },
    guidelines: [

    ],
    tags: [
      'form',
      'content'
    ]
  }
};
module.exports = FormErrorMessageHelpsUser;
