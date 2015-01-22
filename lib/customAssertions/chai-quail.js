(function () {
  "use strict";

  // Module systems magic dance.

  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = chaiQuail;
  } else if (typeof define === "function" && define.amd) {
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

  function chaiQuail(chai, utils) {
    var Assertion = chai.Assertion;
    var assert = chai.assert;
    var flag = utils.flag;


    function method(name, asserter) {
      utils.addMethod(Assertion.prototype, name, function () {
        return asserter.apply(this, arguments);
      });
    }

    function property(name, asserter) {
      utils.addProperty(Assertion.prototype, name, function () {
        return asserter.apply(this, arguments);
      });
    }

    method('quailStatus', function (status) {
      var actual = flag(this, 'object');
      this.assert(
          actual.status == status
        , 'expected #{this} to have status #{exp}'
        , 'expected #{this} not to have status #{exp}'
        , status
      );
    });
  }
}());
