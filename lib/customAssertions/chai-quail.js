'use strict';

(function () {
  'use strict';

  function chaiQuail(chai, utils) {
    var Assertion = chai.Assertion;
    var flag = utils.flag;

    function method(name, asserter) {
      utils.addMethod(Assertion.prototype, name, function () {
        return asserter.apply(this, arguments);
      });
    }

    function getById(id, resultObjects) {
      var i, il, result, idRegex;
      for (i = 0, il = resultObjects.length; i < il; ++i) {
        result = resultObjects[i];
        idRegex = new RegExp('#' + id + '$');
        if (idRegex.exec(result.selector)) {
          return result;
        }
      }
    }

    method('quailStatus', function (status) {
      var actual = flag(this, 'object');
      this.assert(actual.status === status, 'expected case with selector \'' + actual.selector + '\' and status \'' + actual.status + '\' to have status #{exp}', 'expected case with selector \'' + actual.selector + '\' and status \'' + actual.status + '\' to not have status #{exp}', status);
    });

    // Add a method for finding a case by ID and allow chaining.
    utils.addMethod(Assertion.prototype, 'quailGetById', function (id) {
      var resultObjects = flag(this, 'object');
      var result = getById(id, resultObjects);
      // Make sure the ID found a case in the resultObjects.
      this.assert(typeof result !== 'undefined', 'expected id \'' + id + '\' to match the selector of a case', 'expected id \'' + id + '\' to not match the selector of a case');
      flag(this, 'object', result);
      // Return this for chaining.
      return this;
    });
  }

  // Module systems magic dance.

  /* istanbul ignore else */
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // NodeJS
    module.exports = chaiQuail;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function () {
      return chaiQuail;
    });
  } else {
    /*global self: false */

    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(chaiQuail);

    // Expose as a property of the global object so that consumers can configure the `transferPromiseness` property.
    self.chaiQuail = chaiQuail;
  }
})();