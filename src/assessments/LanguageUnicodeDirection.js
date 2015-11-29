var TextSelectorComponent = require('TextSelectorComponent');
var Case = require('Case');
var LanguageComponent = require('LanguageComponent');
var TextNodeFilterComponent = require('TextNodeFilterComponent');
var LanguageUnicodeDirection = {
  run: function (test) {
    var $scope = test.get('$scope');
    var textDirection = LanguageComponent.textDirection;
    var textDirectionChanges = LanguageComponent.textDirectionChanges;
    $scope.each(function () {
      var $local = $(this);
      $local
        .find(TextSelectorComponent)
        .filter(function (index, element) {
          return TextNodeFilterComponent(element);
        })
        .each(function () {
          var _case = test.add(Case({
            element: this
          }));
          var $el = $(this);
          var text = $el.text().trim();
          var otherDirection = (text.substr(0, 1).search(textDirection.ltr) !== -1) ?
            'rtl' :
            'ltr';
          if (text.search(textDirection[otherDirection]) === -1) {
            _case.set({status: 'inapplicable'});
          }
          else {
            if (text.search(textDirectionChanges[otherDirection]) !== -1) {
              _case.set({status: 'passed'});
            }
            else {
              _case.set({status: 'failed'});
            }
          }
        });
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Use the unicode language direction',
      nl: 'Gebruik de unicode taalrichting'
    },
    description: {
      en: 'When there are nested directional changes in language, use unicode RTL/LTR characters.',
      nl: 'Gebruik de unicode RTL/LTR afkortingen als er geneste richtingsveranderingen in de taal zijn.'
    },
    guidelines: {
      wcag: {
        '1.3.2': {
          techniques:  [
            'H34'
          ]
        }
      }
    },
    tags: [
      'language',
      'content'
    ]
  }
};
module.exports = LanguageUnicodeDirection;
