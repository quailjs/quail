$.fn.quail = function(options) {
  if (!this.length) {
    return this;
  }
  quail.options = options;
  quail.html = this;

  quail.run(options);

  return this;
};

$.expr[':'].quailCss = function(obj, index, meta) {
  var args = meta[3].split(/\s*=\s*/);
  return $(obj).css(args[0]).search(args[1]) > -1;
};
