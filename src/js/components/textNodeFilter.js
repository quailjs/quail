/**
 * Returns DOM nodes that contain at least one text node.
 */
quail.components.textNodeFilter = function (element) {
  var nodes = Array.prototype.slice.call(element.childNodes);
  var hasTextNode = false;
  var node;
  for (var i = 0, il = nodes.length; i < il; ++i) {
    node = nodes[i];
    // Determine if,
    // 1) this is a text node, and
    // 2) it has content other than whitespace.
    if (node.nodeType === 3 && /\S/.test(node.textContent)) {
      hasTextNode = true;
      break;
    }
  }
  return hasTextNode;
};
