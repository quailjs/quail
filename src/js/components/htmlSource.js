/*global Tautologistics:true, HtmlBuilder: true */
quail.components.htmlSource = {

  getHtml: function(callback) {
    var that = this;
    if (typeof quail.options.htmlSource !== 'undefined' && quail.options.htmlSource) {
      callback(quail.options.htmlSource, that.parseHtml(quail.options.htmlSource));
      return;
    }
    var data = $.ajax({ url : window.location.href, async : false });
    if (data && typeof data.responseText !== 'undefined') {
      callback(data.responseText, that.parseHtml(data.responseText));
    }
  },

  traverse: function(parsed, callback, number, alreadyCalled) {
    var that = this;
    if (typeof alreadyCalled === 'undefined') {
      callback(parsed, number, false);
    }
    if (typeof parsed.children !== 'undefined') {
      parsed.childCount = 1;
      $.each(parsed.children, function(index, child) {
        callback(child, parsed.childCount, parsed);
        that.traverse(child, callback, parsed.childCount, true);
        if (child.type === 'tag') {
          parsed.childCount++;
        }
      });
    }
    if ($.isArray(parsed)) {
      $.each(parsed, function(index, element) {
        that.traverse(element, callback);
      });
    }
  },

  addSelector: function(element, childNumber, parent) {
    if (element.type !== 'tag' || typeof element.name === 'undefined') {
      return;
    }
    if (typeof element.selector === 'undefined') {
      element.selector = (parent && typeof parent.selector !== 'undefined') ? parent.selector.slice() : [];
    }
    else {
      return;
    }
    var selector = element.name;
    if (typeof element.attributes !== 'undefined') {
      if (typeof element.attributes.id !== 'undefined') {
        selector += '#' + element.attributes.id[0];
      }
      else {
        if (typeof element.attributes.class !== 'undefined') {
          selector += '.' + element.attributes.class[0].replace(/\s/, '.');
        }
      }
    }

    if (childNumber && (typeof element.attributes === 'undefined' || typeof element.attributes.id === 'undefined')) {
      selector += ':nth-child('+ childNumber + ')';
    }
    element.selector.push(selector);
    return element.selector;
  },

  parseHtml: function(html) {
    if (typeof Tautologistics === 'undefined') {
      return false;
    }
    // NodeHtmlParser chokes on doctype tags
    html = html.replace(/<!doctype ([^>]*)>/g, '');
    var handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(function() { }, { });
    var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
    parser.parseComplete(html);
    var parsed = handler.dom;
    var that = this;
    // Traverse through the HTML objects and add a selector property
    this.traverse(parsed, that.addSelector);
    return parsed;
  }
};

if (typeof Tautologistics !== 'undefined') {
  var Mode = {
    Text: 'text',
    Tag: 'tag',
    Attr: 'attr',
    CData: 'cdata',
    Comment: 'comment'
  };

  Tautologistics.NodeHtmlParser.HtmlBuilder.prototype.write = function(element) {
    // this._raw.push(element);
    if (this._done) {
      this.handleCallback(new Error("Writing to the builder after done() called is not allowed without a reset()"));
    }
    if (this._options.includeLocation) {
      if (element.type !== Mode.Attr) {
        element.location = this._getLocation();
        this._updateLocation(element);
      }
    }
    if (element.type === Mode.Text && this._options.ignoreWhitespace) {
      if (HtmlBuilder.reWhitespace.test(element.data)) {
        return;
      }
    }
    var parent;
    var node;
    if (!this._tagStack.last()) { // There are no parent elements
      // If the element can be a container, add it to the tag stack and the top level list
      if (element.type === Mode.Tag) {
        if (element.name.charAt(0) !== "/") { // Ignore closing tags that obviously don't have an opening tag
          node = this._copyElement(element);
          node.closingTag = true;
          this.dom.push(node);
          if (!this.isEmptyTag(node)) { // Don't add tags to the tag stack that can't have children
            this._tagStack.push(node);
          }
          this._lastTag = node;
        }
      } else if (element.type === Mode.Attr && this._lastTag) {
        if (!this._lastTag.attributes) {
          this._lastTag.attributes = {};
        }
        if (typeof this._lastTag.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()] === 'undefined') {
          this._lastTag.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()] = [];
        }
        this._lastTag.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()].push(element.data);
      } else { // Otherwise just add to the top level list
        this.dom.push(this._copyElement(element));
      }
    }
    else {
      parent = this._tagStack.last();

      // There are parent elements
      // If the element can be a container, add it as a child of the element
      // on top of the tag stack and then add it to the tag stack
      if (element.type === Mode.Tag) {
        if (element.name.charAt(0) === "/") {
          // This is a closing tag, scan the tagStack to find the matching opening tag
          // and pop the stack up to the opening tag's parent
          var baseName = this._options.caseSensitiveTags ?
            element.name.substring(1) :
            element.name.substring(1).toLowerCase();
          if (parent.name === baseName) {
            parent.closingTag = true;
          }
          if (!this.isEmptyTag(element)) {
            var pos = this._tagStack.length - 1;
            while (pos > -1 && this._tagStack[pos--].name !== baseName) {
            }
            if (pos > -1 || this._tagStack[0].name === baseName) {
              while (pos < this._tagStack.length - 1) {
                this._tagStack.pop();
              }
            }
          }
        }
        else { // This is not a closing tag
          if (element.type === Mode.Attr) {
            if (!parent.attributes) {
              parent.attributes = {};
            }
            if (typeof parent.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()] === 'undefined') {
              parent.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()] = [];
            }
            parent.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()].push(element.data);
          } else {
            node = this._copyElement(element);
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(node);
            if (!this.isEmptyTag(node)) { // Don't add tags to the tag stack that can't have children
              this._tagStack.push(node);
            }
            if (element.type === Mode.Tag) {
              this._lastTag = node;
            }
          }
        }
      }
      else { // This is not a container element
        parent = this._tagStack.last();
        if (element.type === Mode.Attr) {
          if (!parent.attributes) {
            parent.attributes = {};
          }
          if (typeof parent.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()] === 'undefined') {
            parent.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()] = [];
          }
          parent.attributes[this._options.caseSensitiveAttr ? element.name : element.name.toLowerCase()].push(element.data);
        } else {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(this._copyElement(element));
        }
      }
    }
  };
}
