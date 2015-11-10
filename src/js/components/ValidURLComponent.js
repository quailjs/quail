/**
 * Helper function to determine if a given URL is even valid.
 */
const ValidURLComponent = function (url) {
  return url.search(' ') === -1;
};

module.exports = ValidURLComponent;
