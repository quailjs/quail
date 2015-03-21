module.exports = {
  host: 'localhost',
  port: process.env._PORT || 4444,
  logLevel: 'command',
  waitforTimeout: 1000,
  desiredCapabilities: {
    browserName: process.env._BROWSER || 'phantomjs',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'idle-timeout': 900,
    build: process.env.TRAVIS_BUILD_NUMBER,
    'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
  }
};
