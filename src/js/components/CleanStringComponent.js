const CleanStringComponent = function (string) {
  return string.toLowerCase().replace(/^\s\s*/, '');
};

module.exports = CleanStringComponent;
