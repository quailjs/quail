quail.lib.Case = (function () {

  /**
   * A Case is a test against an element.
   */
  function Case (attributes) {
    return new Case.fn.init(attributes);
  }

  // Prototype object of the Case.
  Case.fn = Case.prototype = {
    constructor: Case,
    init: function (attributes) {
      this.listeners = {};
      this.timeout = null;
      this.attributes = attributes || {};

      var that = this;
      // Dispatch a resolve event if the case is initiated with a status.
      if (this.attributes.status && this.attributes.status !== 'untested') {
        // Delay the status dispatch to the next execution cycle so that the
        // Case will register listeners in this execution cycle first.
        setTimeout(function() {
          that.resolve();
        }, 0);
      }
      // Set up a time out for this case to resolve within.
      else {
        this.attributes.status = 'untested';
        this.timeout = setTimeout(function () {
          that.giveup();
        }, 350);
      }

      return this;
    },
    // Details of the Case.
    attributes: null,
    get: function (attr) {
      return this.attributes[attr];
    },
    set: function (attr, value) {
      var isStatusChanged = false;
      // Allow an object of attributes to be passed in.
      if (typeof attr === 'object') {
        for (var prop in attr) {
          if (attr.hasOwnProperty(prop)) {
            if (prop === 'status') {
              isStatusChanged = true;
            }
            this.attributes[prop] = attr[prop];
          }
        }
      }
      // Assign a single attribute value.
      else {
        if (attr === 'status') {
          isStatusChanged = true;
        }
        this.attributes[attr] = value;
      }

      if (isStatusChanged) {
        this.resolve();
      }
      return this;
    },
    /**
     * A test that determines if a case has one of a set of statuses.
     *
     * @return boolean
     *   A bit that indicates if the case has one of the supplied statuses.
     */
    hasStatus: function (statuses) {
      // This is a rought test of arrayness.
      if (typeof statuses !== 'object') {
        statuses = [statuses];
      }
      var status = this.get('status');
      for (var i = 0, il = statuses.length; i < il; ++i) {
        if (statuses[i] === status) {
          return true;
        }
      }
      return false;
    },
    /**
     * Dispatches the resolve event; clears the timeout fallback event.
     */
    resolve: function () {
      clearTimeout(this.timeout);

      var el = this.attributes.element;
      var outerEl;

      // Get a selector and HTML if an element is provided.
      if (el && el.nodeType && el.nodeType === 1) {
        // Allow a test to provide a selector. Programmatically find one if none
        // is provided.
        this.attributes.selector = this.defineUniqueSelector(el);

        // Get a serialized HTML representation of the element the raised the error
        // if the Test did not provide it.
        if (!this.attributes.html) {
          this.attributes.html = '';

          // If the element is either the <html> or <body> elements,
          // just report that. Otherwise we might be returning the entire page
          // as a string.
          if (el.nodeName === 'HTML' || el.nodeName === 'BODY') {
            this.attributes.html = '<' + el.nodeName + '>';
          }
          // Get the parent node in order to get the innerHTML for the selected
          // element. Trim wrapping whitespace, remove linebreaks and spaces.
          else if (typeof el.outerHTML === 'string') {
            outerEl = el.outerHTML.trim().replace(/(\r\n|\n|\r)/gm,"").replace(/>\s+</g, '><');
            // Guard against insanely long elements.
            // @todo, make this length configurable eventually.
            if (outerEl.length > 200) {
              outerEl = outerEl.substr(0, 200) + '... [truncated]';
            }
            this.attributes.html = outerEl;
          }
        }
      }

      this.dispatch('resolve', this);
    },
    /**
     * Abandons the Case if it not resolved within the timeout period.
     */
    giveup: function () {
      clearTimeout(this.timeout);
      // @todo, the set method should really have a 'silent' option.
      this.attributes.status = 'notTested';
      this.dispatch('timeout', this);
    },
    // @todo, make this a set of methods that all classes extend.
    listenTo: function (dispatcher, eventName, handler) {
      // @todo polyfill Function.prototype.bind.
      handler = handler.bind(this);
      dispatcher.registerListener.call(dispatcher, eventName, handler);
    },
    registerListener: function (eventName, handler) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(handler);
    },
    dispatch: function (eventName) {
      if (this.listeners[eventName] && this.listeners[eventName].length) {
        var eventArgs = [].slice.call(arguments);
        this.listeners[eventName].forEach(function (handler) {
          // Pass any additional arguments from the event dispatcher to the
          // handler function.
          handler.apply(null, eventArgs);
        });
      }
    },

    /**
     * Creates a page-unique selector for the selected DOM element.
     *
     * @param {jQuery} element
     *   An element in a jQuery wrapper.
     *
     * @return {string}
     *   A unique selector for this element.
     */
    defineUniqueSelector: function (element) {
      /**
       * Indicates whether the selector string represents a unique DOM element.
       *
       * @param {string} selector
       *   A string selector that can be used to query a DOM element.
       *
       * @return Boolean
       *   Whether or not the selector string represents a unique DOM element.
       */
      function isUniquePath (selector) {
        return $(selector).length === 1;
      }

      /**
       * Creates a selector from the element's id attribute.
       *
       * Temporary IDs created by the module that contain "visitorActions" are excluded.
       *
       * @param {HTMLElement} element
       *
       * @return {string}
       *   An id selector or an empty string.
       */
      function applyID (element) {
        var selector = '';
        var id = element.id || '';
        if (id.length > 0) {
          selector = '#' + id;
        }
        return selector;
      }

      /**
       * Creates a selector from classes on the element.
       *
       * Classes with known functional components like the word 'active' are
       * excluded because these often denote state, not identity.
       *
       * @param {HTMLElement} element
       *
       * @return {string}
       *   A selector of classes or an empty string.
       */
      function applyClasses (element) {
        var selector = '';
        // Try to make a selector from the element's classes.
        var classes = element.className || '';
        if (classes.length > 0) {
          classes = classes.split(/\s+/);
          // Filter out classes that might represent state.
          classes = reject(classes, function (cl) {
            return (/active|enabled|disabled|first|last|only|collapsed|open|clearfix|processed/).test(cl);
          });
          if (classes.length > 0) {
            return '.' + classes.join('.');
          }
        }
        return selector;
      }

      /**
       * Finds attributes on the element and creates a selector from them.
       *
       * @param {HTMLElement} element
       *
       * @return {string}
       *   A selector of attributes or an empty string.
       */
      function applyAttributes (element) {
        var selector = '';
        var attributes = ['href', 'type'];
        var value;
        if (typeof element === 'undefined' ||
          typeof element.attributes === 'undefined' ||
          element.attributes === null) {
          return selector;
        }
        // Try to make a selector from the element's classes.
        for (var i = 0, len = attributes.length; i < len; i++) {
          value = element.attributes[attributes[i]] && element.attributes[attributes[i]].value;
          if (value) {
            selector += '[' + attributes[i] + '="' + value + '"]';
          }
        }
        return selector;
      }

      /**
       * Creates a unique selector using id, classes and attributes.
       *
       * It is possible that the selector will not be unique if there is no
       * unique description using only ids, classes and attributes of an
       * element that exist on the page already. If uniqueness cannot be
       * determined and is required, you will need to add a unique identifier
       * to the element through theming development.
       *
       * @param {HTMLElement} element
       *
       * @return {string}
       *   A unique selector for the element.
       */
      function generateSelector (element) {
        var selector = '';
        var scopeSelector = '';
        var pseudoUnique = false;
        var firstPass = true;

        do {
          scopeSelector = '';
          // Try to apply an ID.
          if ((scopeSelector = applyID(element)).length > 0) {
            selector = scopeSelector + ' ' + selector;
            // Assume that a selector with an ID in the string is unique.
            break;
          }

          // Try to apply classes.
          if (!pseudoUnique && (scopeSelector = applyClasses(element)).length > 0) {
            // If the classes don't create a unique path, tack them on and
            // continue.
            selector = scopeSelector + ' ' + selector;
            // If the classes do create a unique path, mark this selector as
            // pseudo unique. We will keep attempting to find an ID to really
            // guarantee uniqueness.
            if (isUniquePath(selector)) {
              pseudoUnique = true;
            }
          }

          // Process the original element.
          if (firstPass) {
            // Try to add attributes.
            if ((scopeSelector = applyAttributes(element)).length > 0) {
              // Do not include a space because the attributes qualify the
              // element. Append classes if they exist.
              selector = scopeSelector + selector;
            }

            // Add the element nodeName.
            selector = element.nodeName.toLowerCase() + selector;

            // The original element has been processed.
            firstPass = false;
          }

          // Try the parent element to apply some scope.
          element = element.parentNode;
        } while (element && element.nodeType === 1 && element.nodeName !== 'BODY' && element.nodeName !== 'HTML');

        return selector.trim();
      }

      /**
       * Helper function to filter items from a list that pass the comparator
       * test.
       *
       * @param {Array} list
       * @param {function} comparator
       *   A function that return a boolean. True means the list item will be
       *   discarded from the list.
       * @return array
       *   A list of items the excludes items that passed the comparator test.
       */
      function reject (list, comparator) {
        var keepers = [];
        for (var i = 0, il = list.length; i < il; i++) {
          if (!comparator.call(null, list[i])) {
            keepers.push(list[i]);
          }
        }
        return keepers;
      }

      return element && generateSelector(element);
    },
    push: [].push,
    sort: [].sort,
    concat: [].concat,
    splice: [].splice
  };

  // Give the init function the Case prototype.
  Case.fn.init.prototype = Case.fn;

  return Case;
}());
