module.exports = function(file, api, options) {
  var j = api.jscodeshift;
  var root = j(file.source);
  var body = root.get().value.program.body;

  var capitalizeName = function (name) {
    var firstletter = name[0];
    // Components
    if ([
      'acronym',
      'color',
      'content',
      'convertToPx',
      'event',
      'hasEventListener',
      'headingLevel',
      'htmlSource',
      'htmlTagValidator',
      'label',
      'language',
      'placeholder',
      'statisticsPl',
      'textNodeFilter',
      'textStatistics',
      'video',
      'isDataTable',
      'getTextContents',
      'validURL',
      'cleanString',
      'containsReadableText',
      'textSelector'
    ].indexOf(name) > -1) {
      name = name + 'Component';
    }
    // Strings
    if ([
      'colors',
      'languageCodes',
      'newWindow',
      'placeholders',
      'redundant',
      'siteMap',
      'skipContent',
      'suspiciousLinks',
      'symbols'
    ].indexOf(name) > -1) {
      name = name + 'StringsComponent';
    }
    // Capitalize
    name = firstletter.toUpperCase() + name.substring(1);

    return name;
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
          j.identifier(capitalizeName(name)),
          j.callExpression(
            j.identifier('require'),
            [j.literal(capitalizeName(name))]
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
      return path.parent;
    }
  };

  var dedupe = function (item, pos, self) {
    return self.indexOf(item) === pos;
  };

  if (!body) {
    return null;
  }

  var quailIdents = root.find(
    j.Identifier, {
      name: 'quail'
    }
  )
  var requirementUsages = quailIdents
    .filter(function (path) {
      var node, reqName;
      if (path.parent.value.type === 'MemberExpression') {
        node = path.parent;
        if ([
          'html',
          'guidelines',
          'tests',
          'testFails',
          'run',
          'options',
          'strings',
          'statistics',

        ].indexOf(node.value.property.name) > -1) {
          return false;
        }
        // Do not include assignments; these are module exports.
        if (node.name === 'left') {
          return false;
        }
        else {
          return true;
        }
      }
      return false;
    });

  var requirementNames = requirementUsages
    .map(getLibMemberExpressionNode)
    .nodes()
    .map(function (node) {
      return node.property.name;
    })
    .filter(dedupe);

  // Module names.
  var moduleExports = {
    size: function () {
      return 0;
    }
  };

  var [requirementNames] = [requirementUsages]
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

  var moduleNames = [];
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
          j.identifier(capitalizeName(node.value.property.name))
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
