module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const {expression, statement, statements} = j.template;
  let path = j(file.source);

  path
    .find(j.MemberExpression, {
  		object: {
        	type: 'CallExpression'
        },
        property: {
          name: 'forEach'
        }
  	})
    .filter(me => {
      let testProp;
      let getProp;
      let scopeProp;
      let message = [];
      try {
        testProp = me.parent.value.callee.object.arguments[1].callee.object.name;
      } catch (error) {
        message.push('test');
      }
      try {
        getProp = me.parent.value.callee.object.arguments[1].callee.property.name;
      }
      catch (error) {
        message.push('get');
      }
      try {
        scopeProp = me.parent.value.callee.object.arguments[1].arguments[0].rawValue;
      }
      catch (error) {
        message.push('scope');
      }
      if (message.length > 0) {
        console.log('Could not find: ', message.join(', '));
      }
      return testProp === 'test' && getProp === 'get' && scopeProp === 'scope';
    })
    .forEach(me => {
      me.value.object.arguments.splice(1, 1, j.identifier('scope'));
    })
  	.map((me) => me.parent.parent)
    .forEach(exp => {
      let newExp = j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(
              j.memberExpression(
                j.identifier('test'),
                j.identifier('get')
              ),
            [
              j.literal('scope')
            ]
          ),
          j.identifier('forEach')
        ),
        [
          j.functionExpression(
            j.identifier(''),
            [
              j.identifier('scope')
            ],
            j.blockStatement(
              [
                exp.value
              ]
            ),
            false,
            false
          )
        ]
      )
    );
    j(exp).replaceWith(newExp);
  });

  return path.toSource(options.printOptions || {
    quote: 'single'
  });
};
