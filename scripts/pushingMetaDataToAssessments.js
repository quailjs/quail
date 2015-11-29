module.exports = function(file, api, options) {
  var j = api.jscodeshift;
  var root = j(file.source);
  var body = root.get().value.program.body;
  const {expression, statement, statements} = j.template;

  if (!body) {
    return null;
  }

  var assessmentFunc = root
    .find(j.FunctionExpression)
  	.filter(function (ident) {
    	var keep = false;
  		ident.value.params.forEach(function (param) {
        	if (param.name === 'test') {
            	keep = true;
            }
        });
    	return keep;
  	});
  assessmentFunc
    .replaceWith(j.objectExpression([
      j.property('init', j.identifier('run'), assessmentFunc.nodes()[0]),
      j.property('init', j.identifier('meta'), j.objectExpression([
        j.property('init', j.identifier('replace'), j.literal('this'))
      ])),
    ]));

  return root.toSource(options.printOptions || {
    quote: 'single'
  });
};
