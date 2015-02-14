var fs = require('fs');
var path = require('path');
var yamljs = require('yamljs');

// Load yaml file using yamljs.load
var assessments = yamljs.load(path.join(__dirname, '..', 'src', 'resources', 'tests.yml'));

// Turn the Object into a HTML table representation.

var table = [
  '<table>',
    '<thead>',
      '<tr>',
        '<th></th>',
        '<th></th>',
      '</tr>',
    '</thead>',
  '</table>'
].join('\n');

var assessmentName;
for (assessmentName in assessments) {
  if (assessments.hasOwnProperty(assessmentName)) {

  }
}
// Create a tmp dir if non exists.
if(!fs.existsSync(path.join(__dirname, '..', 'tmp'))){
  fs.mkdirSync(path.join(__dirname, '..', 'tmp'), 0744, function (err){
    if(err){
      console.log(err);
      response.send("ERROR! Can't make the directory! \n");    // echo the result back
    }
  });
}

// Write it out to file.
fs.writeFile(path.join(__dirname, '..', 'tmp', 'assessessments-table.html'), table, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});


