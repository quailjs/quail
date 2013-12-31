quail.embedHasAssociatedNoEmbed = function() {
  if(quail.html.find('noembed').length) {
    return;
  }
  quail.html.find('embed').each(function() {
    quail.testFails('embedHasAssociatedNoEmbed', $(this));
  });
};
