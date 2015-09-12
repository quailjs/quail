module.exports = function(file, api, options) {
  var j = api.jscodeshift;

  var withComments = function (to, from) {
    to.comments = from.comments;
    return to;
  };

  var createRequireExpression = function(requirementNames) {
    return requirementNames.map(function (name) {
      return j.variableDeclaration(
        'var',
        [j.variableDeclarator(
          j.identifier(name),
          j.callExpression(
            j.identifier('require'),
            [j.literal('./' + name)]
          )
        )]
      );
    });
  }

  var root = j(file.source);
  var body = root.get().value.program.body;

  if (!body) {
    return null;
  }

  var libIdents = root.find(
    j.Identifier, {
      name: 'lib'
    }
  )
  var requirementNames = libIdents
    .filter(function (path) {
      var memberExp, parentMemberExp, reqName;
      if (path.parent.value.type === 'MemberExpression') {
        memberExp = path.parent;
        if (memberExp.value.object.type === 'Identifier' &&
          memberExp.value.object.name === 'quail') {
          return true;
        }
      }
      return false;
    })
    .map(function (path) {
      var memberExp, parentMemberExp, reqName;
      if (path.parent.value.type === 'MemberExpression') {
        memberExp = path.parent;
        if (memberExp.value.object.type === 'Identifier' &&
          memberExp.value.object.name === 'quail') {
          return memberExp.parent;
        }
      }
    })
    .nodes()
    .map(function (node) {
      return node.property.name;
    })
    .filter(function (item, pos, self) {
      return self.indexOf(item) === pos;
    });

  if (requirementNames.length > 0) {
    createRequireExpression(requirementNames.sort().reverse())
      .forEach(function (req) {
        body.unshift(req);
      });
    body[0].comments = body[requirementNames.length].comments;
    delete body[requirementNames.length].comments;
  }

  return root.toSource(options.printOptions || {
    quote: 'single'
  });
}
