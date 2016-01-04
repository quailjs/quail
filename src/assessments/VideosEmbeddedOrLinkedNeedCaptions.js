var Case = require('Case');
var VideoComponent = require('VideoComponent');
var VideosEmbeddedOrLinkedNeedCaptions = {
  run: function (test) {
    test.get('scope').forEach((scope) => {
      VideoComponent.findVideos(scope, function (element, pass) {
        if (!pass) {
          test.add(Case({
            element: element,
            status: 'failed'
          }));
        }
        else {
          test.add(Case({
            element: element,
            status: 'passed'
          }));
        }
      });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'All linked or embedded videos need captions',
      nl: 'Alle gekoppelde of ingebedde video\'s moeten bijschriften hebben'
    },
    description: {
      en: 'Any video hosted or otherwise which is linked or embedded must have a caption.',
      nl: 'Elke video die is gekoppeld of ingebed in content moet een bijschrift hebben.'
    },
    guidelines: {
      wcag: {
        '1.2.2': {
          techniques: [
            'G87'
          ]
        },
        '1.2.4': {
          techniques: [
            'G87'
          ]
        }
      }
    },
    tags: [
      'media',
      'content'
    ]
  }
};
module.exports = VideosEmbeddedOrLinkedNeedCaptions;
