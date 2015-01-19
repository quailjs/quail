module.exports = {
  host: 'localhost',
  port: process.env._PORT || 4444,
  logLevel: 'silent',
  waitforTimeout: 1000,
  desiredCapabilities: {
    browserName: process.env._BROWSER || 'phantomjs'
  }
};
