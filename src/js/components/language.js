quail.components.language = {
  textDirection : {
    rtl : /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/mg,
    ltr : /[\u0041-\u007A]|[\u00C0-\u02AF]|[\u0388-\u058F]/mg
  },

  scripts: {
    basicLatin: {
      expression: /[\u0000-\u007F]/g,
      languages: [    
        "ceb",
        "en",
        "eu",
        "ha",
        "haw",
        "id",
        "la",
        "nr",
        "nso",
        "so",
        "ss",
        "st",
        "sw",
        "tlh",
        "tn",
        "ts",
        "xh",
        "zu"
      ]
    },
    extendedLatin: {
      expression: /[\u0100-\u017F]|[\u0180-\u024F]/g,
      languages: [  
        "af",
        "az",
        "ca",
        "cs",
        "cy",
        "da",
        "de",
        "es",
        "et",
        "fi",
        "fr",
        "hr",
        "hu",
        "is",
        "it",
        "lt",
        "lv",
        "nl",
        "no",
        "pl",
        "pt",
        "ro",
        "sk",
        "sl",
        "sq",
        "sv",
        "tl",
        "tr",
        "ve",
        "vi"
      ]
    },
    arabic: {
      expression:  /[\u0600-\u06FF]/g,
      languages: [  
        "ar",
        "fa",
        "ps",
        "ur"
      ]
    },
    cryllic: {
      expression: /[\u0400-\u04FF]|[\u0500-\u052F]/g, 
      languages: [  
        "bg",
        "kk",
        "ky",
        "mk",
        "mn",
        "ru",
        "sr",
        "uk",
        "uz"
      ]
    }
  },

  scriptSingletons : {
    bn: /[\u0980-\u09FF]/g,
    bo: /[\u0F00-\u0FFF]/g,
    el: /[\u0370-\u03FF]/g,
    gu: /[\u0A80-\u0AFF]/g,
    he: /[\u0590-\u05FF]/g,
    hy: /[\u0530-\u058F]/g,
    ka: /[\u10A0-\u10FF]/g,
    km: /[\u1780-\u17FF]|[\u19E0-\u19FF]/g,
    kn: /[\u0C80-\u0CFF]/g,
    lo: /[\u0E80-\u0EFF]/g,
    ml: /[\u0D00-\u0D7F]/g,
    mn: /[\u1800-\u18AF]/g,
    or: /[\u0B00-\u0B7F]/g,
    pa: /[\u0A00-\u0A7F]/g,
    si: /[\u0D80-\u0DFF]/g,
    ta: /[\u0B80-\u0BFF]/g,
    te: /[\u0C00-\u0C7F]/g,
    th: /[\u0E00-\u0E7F]/g
  },

  getDocumentLanguage: function(returnIso) {
    var language = navigator.language || navigator.userLanguage;
    if(typeof quail.options.language !== 'undefined') {
      language = quail.options.language;
    }
    if(quail.html.parents('[lang]').length) {
      language = quail.html.parents('[lang]:first').attr('lang');
    }
    if(typeof quail.html.attr('lang') !== 'undefined') {
      language = quail.html.attr('lang');
    }
    language = language.toLowerCase().trim();
    if(returnIso) {
      return language.split('-')[0];
    }
    return language;
  }
};