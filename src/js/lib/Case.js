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
      this.attributes = attributes;

      return this;
    },
    // Details of the Case.
    attributes: {},
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
    evaluate: function () {

    }
  };

  // Give the init function the Case prototype.
  Case.fn.init.prototype = Case.fn;

  return Case;
}());
