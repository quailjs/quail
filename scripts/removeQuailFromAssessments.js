module.exports = function(file, api, options) {
  var j = api.jscodeshift;
  var root = j(file.source);
  var body = root.get().value.program.body;

  if (!body) {
    return null;
  }

  // Remove Case parameters.
  root
    .find(j.FunctionExpression)
    .forEach(function (funcExp) {
      let index = -1;
      funcExp.value.params.forEach(function (param, ii) {
        if (param.name === 'quail') {
          index = ii;
        }
      });
      if (index > -1) {
        funcExp.value.params.splice(index, 1);
      }
    })

  return root.toSource(options.printOptions || {
    quote: 'single'
  });
}
