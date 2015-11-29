#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var yamljs = require('yamljs');

// Load yaml file using yamljs.load
var assessments = yamljs.load(path.join(__dirname, '..', 'src', 'resources', 'tests.yml'));

function toUpperCase (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function cleanName (name) {
  if (/[\.-\s]/.test(name)) {
    return '\'' + name + '\'';
  }
  else {
    return name;
  }
}

function cleanString (str) {
  return str
    .replace(/\'/g, '\\\'')
    .replace(/\"/g, '\\\"');
}

function stringifyObject (obj, indent, includeIdentifier) {
  var arr = [];
  var opener, closer;
  var tab = '  ';
  var indentstr = '';
  var nextIndex = indent + 1;

  while (indent--) {
    indentstr += tab;
  }

  Object.keys(obj).forEach(function (name) {
    var line = indentstr;
    if (includeIdentifier) {
      line = line + cleanName(name) + ': ';
    }
    switch (typeof obj[name]) {
      case 'object':
        if ('length' in obj[name]) {
          line = line + ' [\n';
          line = line + stringifyObject(obj[name], nextIndex, false) + '\n';
          line = line + indentstr + ']';
        }
        else {
          line = line + '{\n';
          line = line + stringifyObject(obj[name], nextIndex, true) + '\n';
          line = line + indentstr + '}';
        }
        break;
      case 'string':
        line = line + '\'' + cleanString(obj[name]) + '\'';
        break;
      case 'number':
        line = line + obj[name];
        break;
      default:
        console.error('unknown value type');
    }
    arr.push(line);
  });

  return arr.join(',\n');
}

Object.keys(assessments).forEach(function (key) {
  var a = assessments[key];
  // Build the string the represents the metadata.
  var meta = [];
  Object.keys(a).forEach(function (name) {
    var line = '    ' + cleanName(name) + ': ';
    switch (typeof a[name]) {
      case 'object':
        if ('length' in a[name]) {
          line = line + '[\n';
          line = line + stringifyObject(a[name], 3, false) + '\n';
          line = line + '    ]';
        }
        else {
          line = line + '{\n';
          line = line + stringifyObject(a[name], 3, true) + '\n';
          line = line + '    }';
        }
        break;
      case 'string':
        line = line + '\'' + cleanString(a[name]) + '\'';
        break;
      case 'number':
        line = line + a[name];
        break;
      default:
        console.error('unknown value type');
    }
    meta.push(line);
  });
  // Get the assessment file.
  var assessmentFilePath = path.join(__dirname, '..', 'src', 'assessments', toUpperCase(key) + '.js');
  fs.readFile(assessmentFilePath, 'utf8', function (err, data) {
    if (err) {
      console.error('Coule not read file %s.', [assessmentFilePath]);
    }
    else {
      var newFile = data
        .replace('replace: \'this\'', meta.join(',\n'));
      fs.open(assessmentFilePath, 'w', function (err, fd) {
        if (err) {
          console.error('Coule not create file %s.', [key + '.js']);
        }
        // Create the file.
        else {
          var buffer = new Buffer(newFile, "utf-8");

          fs.write(fd, buffer, 0, buffer.length, null, function (err, written, buffer) {
            if (err) {
              console.error(err);
            }
            // Close the file.
            fs.close(fd, function() {
              console.log('Wrote file %s.', [key + '.js']);
            });
          });
        }
      });
    }
  });
});
