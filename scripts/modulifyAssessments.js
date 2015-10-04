module.exports = function(file, api, options) {
  var j = api.jscodeshift;
  var root = j(file.source);
  var body = root.get().value.program.body;

  var capitalizeName = function (name) {
    var firstletter = name[0];
    return firstletter.toUpperCase() + name.substring(1);
  };

  var withComments = function (to, from) {
    to.comments = from.comments;
    return to;
  };

  var createRequireExpression = function (requirementNames) {
    return requirementNames.map(function (name) {
      return j.variableDeclaration(
        'var',
        [j.variableDeclarator(
          j.identifier(name),
          j.callExpression(
            j.identifier('require'),
            [j.literal(name)]
          )
        )]
      );
    });
  }

  var createExportExpression = function (exportNames) {
    return exportNames.map(function (name) {
      return j.expressionStatement(
        j.assignmentExpression(
          '=',
          j.memberExpression(
            j.identifier('module'),
            j.identifier('exports')
          ),
          j.identifier(name)
        )
      );
    });
  };

  var getLibMemberExpressionNode = function (path) {
    var node, reqName;
    if (path.parent.value.type === 'MemberExpression') {
      node = path.parent;
      if (node.value.object.type === 'Identifier' &&
        node.value.object.name === 'quail') {
        return node.parent;
      }
    }
  };

  var dedupe = function (item, pos, self) {
    return self.indexOf(item) === pos;
  };

  if (!body) {
    return null;
  }

  var libIdents = root
    .find(j.Identifier)
    .filter(function (ident) {
      return ['lib', 'components', 'strings']
        .indexOf(ident.value.name) > -1;
    });

  var identFilter = function (path) {
    var node, reqName;
    if (path.parent.value.type === 'MemberExpression') {
      node = path.parent;
      if (node.value.object.type === 'Identifier' &&
        node.value.object.name === 'quail') {
        node = node.parent;
        // Do not include assignments; these are module exports.
        if (node.name === 'left') {
          return false;
        }
        else {
          return true;
        }
      }
    }
    return false;
  };

  var requirementUsages = libIdents.filter(identFilter);
  //requirementUsages.add(componentIdents.filter(identFilter));

  var requirementNames = requirementUsages
    .map(getLibMemberExpressionNode)
    .nodes()
    .map(function (node) {
      return node.property.name;
    })
    .filter(dedupe);

  // Module names.
  var moduleExports = libIdents
    .filter(function (path) {
      var node, reqName;
      if (path.parent.value.type === 'MemberExpression') {
        node = path.parent;
        if (node.value.object.type === 'Identifier' &&
          node.value.object.name === 'quail') {
          node = node.parent;
          // Include assignments; these are module exports.
          if (node.name === 'left') {
            return true;
          }
          else {
            return false;
          }
        }
      }
      return false;
    });

  var [requirementNames, moduleNames] = [requirementUsages, moduleExports]
    .map(function (usage) {
      return usage
        .map(getLibMemberExpressionNode)
        .nodes()
        .map(function (node) {
          return node.property.name;
        })
        .filter(dedupe);
    });

  // Add require statements.
  if (requirementNames.length > 0) {
    createRequireExpression(requirementNames.sort().reverse())
      .forEach(function (req) {
        body.unshift(req);
      });
    body[0].comments = body[requirementNames.length].comments;
    delete body[requirementNames.length].comments;
  }

  // Add export expressions.
  if (moduleNames.length > 0) {
    createExportExpression(moduleNames.sort())
      .forEach(function (req) {
        body.push(req);
      });
  }

  // Remove expressions.
  if (requirementUsages.size() > 0) {
    requirementUsages
      .map(getLibMemberExpressionNode)
      .forEach(function (node) {
        j(node).replaceWith(
          j.identifier(node.value.property.name)
        )
      });
  }

  if (moduleExports.size() > 0) {
    moduleExports
      .map(getLibMemberExpressionNode)
      .forEach(function (node) {
        j(node.parent).replaceWith(
          j.variableDeclaration(
            'var',
            [j.variableDeclarator(
              j.identifier(node.value.property.name),
              node.parent.value.right
            )]
          )
        )
      });
  }

  return root.toSource(options.printOptions || {
    quote: 'single'
  });
}
