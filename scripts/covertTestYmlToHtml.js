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
        '<th>Name</th>',
        '<th>Description</th>',
        '<th>Coverage</th>',
      '</tr>',
    '</thead>',
    '<tbody>'
].join('\n');

var assessmentName;
var assessment;
for (assessmentName in assessments) {
  if (assessments.hasOwnProperty(assessmentName)) {
    assessment = assessments[assessmentName];
    var name = assessmentName;
    var title =  assessment.title && assessment.title.en || '';
    // Guidelines exposed in an inner-table.
    var guidelineTable = [
      '<table>',
        '<thead>',
          '<tr>',
            '<th>Guideline</th>',
            '<th>Section</th>',
            '<th>Techniques</th>',
          '</tr>',
        '</thead>',
        '<tbody>'
    ].join('\n');
    var guidelines = assessment.guidelines || {};
    var gl, glName;
    var glNames = [];
    var sectionName, section, techniques;

    // Guideline.
    for (glName in guidelines) {
      if (guidelines.hasOwnProperty(glName)) {
        gl = guidelines[glName];
        // Section.
        for (sectionName in gl) {
          if (gl.hasOwnProperty(sectionName)) {
            section = gl[sectionName];
            guidelineTable += [
              '<tr>',
                '<th scope="row">' + glName + '</th>',
                '<td>' + sectionName + '</td>']
            .join('\n');

            // Techniques
            if (section.techniques && section.techniques.length > 0) {
              techniques = [];
              section.techniques.forEach(function (technique) {
                techniques.push(technique);
              });
              guidelineTable += '<td>' + techniques.join(', ') + '</td>\n';
            }
            else {
              guidelineTable += '<td>No technique coverage.</td>\n';
            }

            guidelineTable += [
              '</tr>'
            ].join('\n');
          }
        }
      }
    }

    guidelineTable += [
      '</tbody>',
    '</table>'
    ].join('\n');

    table += [
      '<tr>',
        '<th scope="row">' + name + '</th>',
        '<td>' + title + '</td>',
        '<td>' + guidelineTable + '</td>',
      '</tr>'
    ].join('\n');

  }
}

table += [
  '</tbody>',
'</table>'
].join('\n');
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


