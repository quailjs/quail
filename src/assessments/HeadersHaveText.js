/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
var PlaceholderComponent = require('PlaceholderComponent');

var HeadersHaveText = {
  run: function (test, options) {
    options = options || {
      selector: 'h1, h2, h3, h4, h5, h6',
      content: 'true',
      empty: 'true'
    };
    PlaceholderComponent(test, options);
  },

  meta: {
    testability: 1,
    title: {
      en: 'All headers should contain readable text',
      nl: 'Alle headers moeten leesbare tekst bevatten'
    },
    description: {
      en: 'Users with screen readers use headings like the tabs <em>h1</em> to navigate the structure of a page. All headings should contain either text, or images with appropriate <em>alt</em> attributes.',
      nl: 'Gebruikers van schermlezers gebruiken headers om via de structuur van een pagina te navigeren. Alle headers moeten daarom tekst bevatten of afbeeldingen met toepasselijk <em>alt</em>-attributen.'
    },
    guidelines: {
      wcag: {
        '1.3.1': {
          techniques: [
            'G141'
          ]
        },
        '2.4.10': {
          techniques: [
            'G141'
          ]
        }
      }
    },
    tags: [
      'header',
      'content'
    ]
  }
};
module.exports = HeadersHaveText;
