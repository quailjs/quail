const BorderDetailsComponent = require('BorderDetailsComponent');
const Case = require('Case');
const DOM = require('DOM');
const AInPHasADistinctStyle = {
  run: function (test) {

    /**
     * Checks if an element has a border set
     * @param element
     * @returns {boolean}
     */
    function hasBorder (element) {
      let borders = BorderDetailsComponent(element);
      let width = 0;
      for (let border of borders) {
        let [
          side,
          details
        ] = border;
        width += details.width;
      }
      return (width > 0);
    }

    /**
     * Test if two elements have a distinct style from it's ancestor
     * @param  {jQuery node} $elm
     * @param  {jQuery node} $parent
     * @return {boolean}
     */
    function elmHasDistinctStyle ($elm, $parent) {
      var result = false;
      var styleProperties = ['font-weight', 'font-style'];
      var textDecoration = DOM.getComputedStyle($elm, 'text-decoration');

      if (textDecoration !== 'none' &&
      textDecoration !== DOM.getComputedStyle($parent, 'text-decoration')) {
        result = true;
      }

      if (DOM.getComputedStyle($elm, 'background-color') !== 'rgba(0, 0, 0, 0)') {
        styleProperties.push('background');
      }

      styleProperties.forEach(function (styleProp) {
        if (!result && DOM.getComputedStyle($elm, styleProp) !== DOM.getComputedStyle($parent, styleProp)) {
          result = true;
        }
      });

      return result || hasBorder($elm);
    }

    function elmHasDistinctPosition ($elm) {
      var isBlock = (DOM.getComputedStyle($elm, 'display') === 'block');
      var position = DOM.getComputedStyle($elm, 'position');
      var isPositioned = position !== 'relative' && position !== 'static';
      return isBlock || isPositioned;
    }

    // Ignore links where the p only contains white space, <, >, |, \, / and - chars
    var allowedPText = /^([\s|-]|>|<|\\|\/|&(gt|lt);)*$/i;

    test.get('scope').forEach(function (scope) {
      var anchors = DOM.scry('p a[href]', scope);

      anchors.forEach(function (element) {
        var $p = DOM.parents(element).find((parent) => DOM.is(parent, 'p'));
        var $parent = element.parentNode;

        var _case = Case({
          element: element
        });
        test.add(_case);

        var aText = DOM.text(element).trim();

        // Get all text of the p element with all anchors removed
        var pClone = $p.cloneNode(true);
        DOM.scry('a[href]', pClone).forEach((link) => {
          link.parentNode.removeChild(link);
        });
        var pText = DOM.text(pClone).trim();

        if (aText === '' || pText.match(allowedPText)) {
          _case.set('status', 'inapplicable');
        }
        else if (
          DOM.getComputedStyle(element, 'color') === DOM.getComputedStyle($p, 'color')
        ) {
          _case.set('status', 'passed');
        }
        else if (elmHasDistinctStyle(element, $p)) {
          _case.set('status', 'passed');
        }
        else if (elmHasDistinctPosition(element)) {
          _case.set('status', 'passed');
        }
        else if (DOM.scry('img', element).length > 0) {
          _case.set('status', 'passed');
        }
        else if (DOM.text($parent).trim() === aText &&
        elmHasDistinctStyle($parent, $p)) {
          _case.set('status', 'passed');
        }
        else {
          _case.set('status', 'failed');
        }
      });

    });

  },

  meta: {
    testability: 1,
    title: {
      en: 'Links should be have a distinct style inside a p tag',
      nl: 'Links moeten een afwijkende stijl hebben binnen een paragraaf'
    },
    description: {
      en: '',
      nl: ''
    },
    guidelines: [

    ],
    tags: [
      'link',
      'content'
    ]
  }
};
module.exports = AInPHasADistinctStyle;
