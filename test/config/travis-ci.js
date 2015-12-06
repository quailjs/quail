module.exports = {
  host: 'localhost',
  port: process.env._PORT || 4444,
  logLevel: 'silent',
  waitforTimeout: 1000,
  desiredCapabilities: {
    browserName: process.env._BROWSER || 'phantomjs',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'idle-timeout': 900,
    build: process.env.TRAVIS_BUILD_NUMBER,
    'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
  }
};
/*
module.exports = {
  host: 'ondemand.saucelabs.com',
  port: 80,
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  logLevel: 'silent',
  waitforTimeout: 1000,
  desiredCapabilities: {
    browserName: (process.env._BROWSER || '').replace(/_/g, ' '),
    platform: (process.env._PLATFORM || '').replace(/_/g, ' '),
    version: process.env._VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'idle-timeout': 900,
    tags: ['webdriverio', process.env._ENV || 'desktop', process.env._BROWSER, process.env._PLATFORM, process.env._VERSION],
    name: 'webdriverio test',
    build: process.env.TRAVIS_BUILD_NUMBER,
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY
  }
};
*/
