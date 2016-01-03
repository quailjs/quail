var Case = require('Case');
const DOM = require('DOM');
const TableHeadersComponent = require('TableHeadersComponent');
var LinkHasAUniqueContext = {
  run: function (test) {

    var blockStyle = [
      'block',
      'flex',
      'list-item',
      'table',
      'table-caption',
      'table-cell'
    ];

    function getLinkSentence (link) {
      // Find the closest block-like element
      var block = link;
      var text = simplifyText(DOM.text(link));

      while (!DOM.is(block, 'body, html') && blockStyle.indexOf(DOM.getComputedStyle(block, 'display')) === -1) {
        block = block.parentNode;
      }

      var sentences = DOM.text(block).match(/[^\.!\?]+[\.!\?]+/g);
      if (sentences === null) {
        sentences = [DOM.text(block)];
      }

      for (var i = 0; i < sentences.length; i+= 1) {
        if (simplifyText(sentences[i]).indexOf(text) !== -1) {
          return sentences[i].trim();
        }
      }
    }

    function simplifyText (text) {
      var tmp = text.match(/\w+/g);
      if (tmp !== null) {
        text = tmp.join(' ');
      }
      return text.toLowerCase();
    }

    function txtNotAlike (a, b) {
      return simplifyText('' + a) !== simplifyText('' + b);
    }

    function shareContext (linkA, linkB) {

      if (linkA.href === linkB.href) {
        return false;
      }
      else if (txtNotAlike(linkA.title, linkB.title)) {
        return false;
      }

      // Find the nearest list item, paragraph or table cell of both items
      var selector = 'p, li, dd, dt, td, th';
      var linkACtxt = DOM.parents(linkA).find(
        (parent) => DOM.is(parent, selector)
      );
      var linkBCtxt = DOM.parents(linkB).find(
        (parent) => DOM.is(parent, selector)
      );

      // check if they are different
      if (linkACtxt.length !== 0 && linkBCtxt.length !== 0 &&
      txtNotAlike(getLinkText(linkACtxt), getLinkText(linkBCtxt))) {
        return false;
      }

      // If one is a table cell and the other isn't, allow it
      if (DOM.is(linkACtxt, 'td, th') && !DOM.is(linkBCtxt, 'td, th')) {
        return false;

      }
      else if (DOM.is(linkACtxt, 'td, th') && DOM.is(linkBCtxt, 'td, th')) {
        var headerDiff = false;
        var headersA = [];

        // Make a list with the simplified text of link A
        TableHeadersComponent.tableHeaders(linkACtxt).forEach(function (element) {
          headersA.push(simplifyText(element.innerText));
        });

        // Compare it to the header context of link B
        TableHeadersComponent.tableHeaders(linkBCtxt).forEach(function (element) {
          var text = simplifyText(element.innerText);
          var pos = headersA.indexOf(text);
          // Link B has something not part of link A's context, pass
          if (pos === -1) {
            headerDiff = true;
          }
          // Remove items part of both header lists
          else {
            headersA.splice(pos, 1);
          }
        });
        // Pass if A or B had a header not part of the other.
        if (headerDiff || headersA.length > 0) {
          return false;
        }
      }

      if (txtNotAlike(getLinkSentence(linkA), getLinkSentence(linkB))) {
        return false;
      }

      return true;
    }

    /**
     * Get the text value of the link, including alt attributes
     * @param  {jQuery} link
     * @return {string}
     */
    function getLinkText (link) {
      var text = link.innerText;
      DOM.scry('img[alt]', link).forEach(function (element) {
        text += ' ' + element.alt.trim();
      });
      return simplifyText(text);
    }

    test.get('scope').forEach(function (scope) {
      var links = DOM.scry('a[href]', scope)
        .filter((element) => DOM.isVisible(element));
      var linkMap = {};

      if (links.length === 0) {
        var _case = Case({
          element: scope,
          status: 'inapplicable'
        });
        test.add(_case);
      }

      // Make a map with the link text as key and an array of links with
      // that link text as it's value
      links.forEach(function (element) {
        var text = getLinkText(element);
        if (typeof linkMap[text] === 'undefined') {
          linkMap[text] = [];
        }
        linkMap[text].push(this);
      });

      // Iterate over each item in the linkMap
      for (var linkText in linkMap) {
        if (linkMap.hasOwnProperty(linkText)) {
          links = linkMap[linkText];
        }
        else {
          continue;
        }

        // Link text is not unique, so the context should be checked
        while (links.length > 1) {
          var linkA = links.pop();
          var linkAFailed = false;

          for (var i = links.length - 1; i >= 0; i -= 1) {
            var linkB = links[i];
            if (shareContext(linkA, linkB)) {
              linkAFailed = true;
              links.splice(i, 1);
              test.add(Case({
                element: linkB,
                status: 'failed'
              }));
            }
          }
          test.add(Case({
            element: linkA,
            status: (linkAFailed ? 'failed' : 'passed')
          }));
        }

        // The link text is unique, pass
        if (links.length === 1) {
          test.add(Case({
            element: links[0],
            status: 'passed'
          }));
        }
      }
    });
  },

  meta: {
    testability: 1,
    title: {
      en: 'Links should have a unique context',
      nl: 'Links moeten een unieke context hebben'
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
module.exports = LinkHasAUniqueContext;
