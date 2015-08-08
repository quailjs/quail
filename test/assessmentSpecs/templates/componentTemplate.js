/**
 * A wrapper for assessments that call a component to determine
 * the test outcome.
 */
quail.%name% = function (quail, test, Case) {
  var options = {
    %options%
  };
  quail.components.%component%(quail, test, Case, options);
};
