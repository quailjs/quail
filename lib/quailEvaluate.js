var shell = require('shelljs');
var path = require('path');

/**
 *
 */
module.exports = function quailEvaluate (url, cmd) {
  // Change to the dist dir.
  shell.cd(__dirname);
  shell.cd('..');
  var pwd = shell.pwd();

  var runnerScript;
  var phantomjsExec = path.join(__dirname, '..', 'node_modules/.bin/phantomjs');
  var runners = {
    'default': path.join(__dirname, '..', 'src/js/scripts/phantom_evaluator.js'),
    'wcag2': path.join(__dirname, '..', 'src/js/scripts/wcag2_evaluator.js')
  };

  if (cmd.runner in runners) {
    runnerScript = runners[cmd.runner];
  }
  else {
    runnerScript = runners['default'];
  }

  var command = [phantomjsExec, runnerScript, url, pwd].join(' ');
  shell.exec(command, {
    async: true
  }, function (code, output) {
    shell.echo('code: ' + code);
  });
}
