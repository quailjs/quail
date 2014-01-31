quail.components.language = function() {
	
};

quail.components.language.textDirection = {
  rtl : /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/mg,
  ltr : /[\u0041-\u007A]|[\u00C0-\u02AF]|[\u0388-\u058F]/mg
};