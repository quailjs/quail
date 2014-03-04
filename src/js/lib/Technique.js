quail.lib.Technique = (function () {

  var details;

  /**
   * A collection of Cases.
   */
  function Technique (name, attributes) {
    return new Technique.fn.init(name, attributes);
  }

  // Prototype object of the Technique.
  Technique.fn = Technique.prototype = {
    constructor: Technique,
    init: function (name, attributes) {
      if (!name) {
        return this;
      }
      this.attributes = attributes || {};
      this.attributes.name = name;

      return this;
    },
    // Setting a length property makes it behave like an array.
    length: 0,
    // Details of the test.
    attributes: {},
    // Execute a callback for every element in the matched set.
    each: function (iterator) {
      var args = [].slice(arguments, 1);
      for (var i = 0, len = this.length; i < len; ++i) {
        args.unshift(this[i]);
        args.unshift(i);
        iterator.apply(this[i], args);
      }
      return this;
    },
    get: function (attr) {
      return this.attributes[attr];
    },
    set: function (attr, value) {
      // Allow an object of attributes to be passed in.
      if (typeof attr === 'object') {
        for (var prop in attr) {
          if (attr.hasOwnProperty(prop)) {
            this.attributes[prop] = attr[prop];
          }
        }
      }
      // Assign a single attribute value.
      else {
        this.attributes[attr] = value;
      }
      return this;
    },
    invoke: function (context) {
      var name = this.get('name');
      var type = this.get('type');
      var options = this.get('options') || {};
      var callback = this.get('callback');
      var test = this;

      if(type === 'selector') {
        // If options.filter is defined, then options.selector is collecting
        // a set of candidate elements; it is not simply a selector to find
        // elements that fail the test.
        if (options.filter) {
          var candidates = quail.html.find(options.selector);
          // Not applicable.
          if (!candidates.length) {
            this.status = 'inapplicable';
            return;
          }
          else {
            // Passes.
            candidates.not(options.filter).each(function () {
              test.push(quail.lib.Case({
                status: 'passed',
                element: this
              }));
            });
            // Fails.
            candidates.filter(options.filter).each(function () {
              test.push(quail.lib.Case({
                status: 'failed',
                element: this
              }));
            });
          }
        }
        else {
          quail.html.find(options.selector).each(function() {
            test.push(quail.lib.Case({
              status: 'failed',
              element: this
            }));
          });
        }
      }
      else if(type === 'custom') {
        if(typeof callback === 'object' || typeof callback === 'function') {
          callback(quail);
        }
        else {
          if(typeof quail[callback] !== 'undefined') {
            quail[callback](quail);
          }
        }
      }
      else if(typeof quail.components[type] !== 'undefined') {
        quail.components[type](name, this.attributes);
      }
      return this;
    },
    push: [].push,
    sort: [].sort,
    splice: [].splice
  };

  // Give the init function the Technique prototype.
  Technique.fn.init.prototype = Technique.fn;

  return Technique;
}());
