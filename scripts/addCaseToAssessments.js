module.exports = function(file, api, options) {
  var j = api.jscodeshift;
  var root = j(file.source);
  var body = root.get().value.program.body;

  if (!body) {
    return null;
  }

  var dedupe = function (item, pos, self) {
    return self.indexOf(item) === pos;
  };

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
      'video'
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
  };

  const requirementNames = [
    'Case'
  ];

  const needsCaseRequirement = root
    .find(j.CallExpression)
    .filter(function (exp) {
      let val = exp &&
        exp.value &&
        exp.value.arguments &&
        exp.value.arguments[0] &&
        exp.value.arguments[0].value;
      return val === 'Case';
    })
    .nodes()
    .map(function (exp) {
      return 'Case';
    })
    .filter(dedupe)
    .length === 0;

  // Add require statements.
  if (needsCaseRequirement) {
    createRequireExpression(requirementNames)
      .forEach(function (req) {
        body.unshift(req);
      });
    body[0].comments = body[requirementNames.length].comments;
    delete body[requirementNames.length].comments;
  }

  // Remove Case parameters.

  return root.toSource(options.printOptions || {
    quote: 'single'
  });
}
