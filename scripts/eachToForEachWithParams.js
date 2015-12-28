module.exports = function(file, api) {
  const j = api.jscodeshift;
  const {expression, statement, statements} = j.template;

  var root = j(file.source);


  root
  .find(j.FunctionExpression)
  .filter(fe => {
    // scry
    var scryProp;
    var eachProp;
    try {
      scryProp = fe.parent.value.callee.object.name;
    }
    catch (e) {
    	// console.log('no scry call');
    }
    try {
      eachProp = fe.parent.value.callee.property.name;
    }
    catch (e) {
      // console.log('no each prop');
    }
    return (['candidates'].indexOf(scryProp) > -1) && eachProp === 'each';
  })
  .forEach(fn => {
    if (fn.value.body) {
      var newFn = j.functionExpression(
        j.identifier(fn.value.id || ''),
	    fn.value.params.concat(
          j.identifier('element')
        ),
        fn.value.body,
        fn.value.generator,
        fn.value.expression
      );
      j(fn).replaceWith(newFn);
    }
  })
  .find(j.ThisExpression)
  .forEach(te => {
  	switch (te.parent.value.type) {
      case 'Property':
        j(te.parent).replaceWith(
          j.property(
          	'init',
            j.identifier(te.parent.value.key.name),
            j.identifier('element')
          ));
        break;
      case 'CallExpression':
        if (['$', 'jQuery', 'jquery'].indexOf(te.parent.value.callee.name) > -1) {
        	j(te.parent).replaceWith(j.callExpression(
          	j.identifier(te.parent.value.callee.name),
          	[j.identifier('element')]
          ));
        }
        else if (te.parent.value.arguments.length > 0) {
          var index;
          te.parent.value.arguments.forEach((a, ii) => {
            if (a.type === 'ThisExpression') {
            	index = ii;
            }
          });
          if (index) {
            te.parent.value.arguments[index] = j.identifier('element');
          }
        }
        else {
          console.log('unhandled case', te.parent.value.type);
        }
        break;
      case 'VariableDeclarator':
  		  j(te.parent).replaceWith(
        	j.variableDeclarator(
            j.identifier(te.parent.value.id.name),
            j.identifier('element')
          )
        );
        break;
      case 'MemberExpression':
        if (te.parent.value.object.type === 'ThisExpression') {
          j(te.parent).replaceWith(
            j.memberExpression(
              j.identifier('element'),
              te.parent.value.property
            )
          );
        }
        else {
          console.log('unhandled case', te.parent.value.type);
        }
        break;
      default:
        console.log('Unhandled this case', te.parent.value.type);
        break;
    }
  });

  var b = root
    .find(j.Identifier, {
      name: 'each'
    })
    .filter(e => {
      var scryProp;
      try {
        scryProp = e.parent.value.object.name;
      }
      catch (e) {
      	//console.log('no scry');
      }
      return (['candidates'].indexOf(scryProp) > -1);
    })
    .replaceWith(
      p => j.identifier('forEach')
    );

  return b.toSource();
};
