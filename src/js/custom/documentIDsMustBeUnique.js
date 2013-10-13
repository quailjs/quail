quail.documentIDsMustBeUnique = function() {
  var ids = [];
  quail.html.find('*[id]').each(function() {
    if(ids.indexOf($(this).attr('id')) >= 0) {
      quail.testFails('documentIDsMustBeUnique', $(this));
    }
    ids.push($(this).attr('id'));
  });
};
