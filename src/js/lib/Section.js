quail.lib.Section = (function () {

  /**
   * A Section of a Guideline.
   */
  function Section (number, attributes) {
    return new Section.fn.init(number, attributes);
  }

  // Prototype object of the Section.
  Section.fn = Section.prototype = {
    constructor: Section,
    init: function (number, attributes) {
      this.attributes = attributes;
      this.attributes.number = number;

      return this;
    },
    // Details of the Section.
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
    }
  };

  // Give the init function the Section prototype.
  Section.fn.init.prototype = Section.fn;

  return Section;
}());
