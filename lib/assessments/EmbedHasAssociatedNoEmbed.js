'use strict';

var Case = require('Case');
var EmbedHasAssociatedNoEmbed = function EmbedHasAssociatedNoEmbed(quail, test) {
  test.get('$scope').find('embed').each(function () {
    var _case = Case({
      element: this
    });
    test.add(_case);
    _case.set({
      status: $(this).find('noembed').length || $(this).next().is('noembed') ? 'passed' : 'failed'
    });
  });
};
module.exports = EmbedHasAssociatedNoEmbed;