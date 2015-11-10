/**
 * Regular expression to find emoticons.
 */
"use strict";

var EmoticonRegex = /((?::|;|B|P|=)(?:-)?(?:\)|\(|o|O|D|P))/g;

module.exports = EmoticonRegex;