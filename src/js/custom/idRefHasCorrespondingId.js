quail.idRefHasCorrespondingId = function() {
  quail.html.find('[idref]').each(function() {
    if(quail.html.find('#' + $(this).attr('idref')).length === 0) {
      quail.testFails('idRefHasCorrespondingId', $(this));
    }
  });
};
