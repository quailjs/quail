var quailImageLoader = function(spec) {
  
  var that = {};
  
  var stream = {};
  
  that.loadImage = function() {
    $.ajax({url      : spec.img.attr('src'),
            dataType : 'text',
            success  : function(data) {
              that.downloadSuccess(data);  
            }
    });
  };
  
  that.downloadSuccess = function(data) {
    console.log(data);
  };
  
  return that;
  
};

var quailGifParser = function(spec) {
  var that = quailImageLoader(spec);
  
  that.currentStream = {};
  
  that.handler = {
    hdr : function(data) {
    },
    gce : function(gce) {
      console.log(gce);
    }
  };
  
  that.downloadSuccess = function(data) {
    that.currentStream = new that.Stream(data);
    var lzwMinCodeSize = that.currentStream.readByte();
    var parseBlock = function () {
      var block = {};
      block.sentinel = that.currentStream.readByte();
      switch (String.fromCharCode(block.sentinel)) { // For ease of matching
      case '!':
        block.type = 'ext';
        that.parseExt(block);
        break;
      case ',':
        block.type = 'img';
        break;
      case ';':
        block.type = 'eof';
        break;
      default:

      } 
      if (block.type !== 'eof') parseBlock();
    };
    
    parseBlock();
    //that.parseGIF(stream);
  };
  
  that.parseExt = function (block) {
      
  
      var readSubBlocks = function() {
          var size, data;
          data = '';
          do {
            size = st.readByte();
            data += st.read(size);
          } while (size !== 0);
          return data;
      };
      
      var parseGCExt = function (block) {
        var blockSize = that.currentStream.readByte();
        var bits = byteToBitArr(that.currentStream.readByte());
        block.reserved = bits.splice(0, 3);
        block.disposalMethod = bitsToNum(bits.splice(0, 3));
        block.userInput = bits.shift();
        block.transparencyGiven = bits.shift();
  
        block.delayTime = that.currentStream.readUnsigned();
  
        block.transparencyIndex = that.currentStream.readByte();
  
        block.terminator = that.currentStream.readByte();
  
        handler.gce && handler.gce(block);
      };
      
      var parseComExt = function (block) {
        block.comment = readSubBlocks();
        handler.com && handler.com(block);
      };
  
      var parsePTExt = function (block) {
        var blockSize = that.currentStream.readByte();
        block.ptHeader = that.currentStream.readBytes(12);
        block.ptData = readSubBlocks();
        handler.pte && handler.pte(block);
      };
  
      var parseAppExt = function (block) {
        var parseNetscapeExt = function (block) {
          var blockSize = that.currentStream.readByte();
          block.unknown = that.currentStream.readByte();
          block.iterations = that.currentStream.readUnsigned();
          block.terminator = that.currentStream.readByte();
          handler.app && handler.app.NETSCAPE && handler.app.NETSCAPE(block);
        };
  
        var parseUnknownAppExt = function (block) {
          block.appData = readSubBlocks();
          handler.app && handler.app[block.identifier] && handler.app[block.identifier](block);
        };
  
        var blockSize = that.currentStream.readByte();
        block.identifier = that.currentStream.read(8);
        block.authCode = that.currentStream.read(3);
        switch (block.identifier) {
        case 'NETSCAPE':
          parseNetscapeExt(block);
          break;
        default:
          parseUnknownAppExt(block);
          break;
        }
      };
  
      var parseUnknownExt = function (block) {
        block.data = readSubBlocks();
        handler.unknown && handler.unknown(block);
      };
  
      block.label = that.currentStream.readByte();
      switch (block.label) {
      case 0xF9:
        block.extType = 'gce';
        parseGCExt(block);
        break;
      case 0xFE:
        block.extType = 'com';
        parseComExt(block);
        break;
      case 0x01:
        block.extType = 'pte';
        parsePTExt(block);
        break;
      case 0xFF:
        block.extType = 'app';
        parseAppExt(block);
        break;
      default:
        block.extType = 'unknown';
        parseUnknownExt(block);
        break;
      }
    };
  that.bitsToNum = function (ba) {
    return ba.reduce(function (s, n) {
      return s * 2 + n;
    }, 0);
  };
  
  that.byteToBitArr = function (bite) {
    var a = [];
    for (var i = 7; i >= 0; i--) {
      a.push( !! (bite & (1 << i)));
    }
    return a;
  };
  
  that.Stream = function (data) {
    this.data = data;
    this.len = this.data.length;
    this.pos = 0;
  
    this.readByte = function () {
      if (this.pos >= this.data.length) {
        throw new Error('Attempted to read past end of stream.');
      }
      return data.charCodeAt(this.pos++) & 0xFF;
    };
  
    this.readBytes = function (n) {
      var bytes = [];
      for (var i = 0; i < n; i++) {
        bytes.push(this.readByte());
      }
      return bytes;
    };
  
    this.read = function (n) {
      var s = '';
      for (var i = 0; i < n; i++) {
        s += String.fromCharCode(this.readByte());
      }
      return s;
    };
  
    this.readUnsigned = function () { // Little-endian.
      var a = this.readBytes(2);
      return (a[1] << 8) + a[0];
    };
  };
  
  that.lzwDecode = function (minCodeSize, data) {
    var pos = 0;
    var readCode = function (size) {
      var code = 0;
      for (var i = 0; i < size; i++) {
        if (data.charCodeAt(pos >> 3) & (1 << (pos & 7))) {
          code |= 1 << i;
        }
        pos++;
      }
      return code;
    };
  
    var output = [];
  
    var clearCode = 1 << minCodeSize;
    var eoiCode = clearCode + 1;
  
    var codeSize = minCodeSize + 1;
  
    var dict = [];
  
    var clear = function () {
      dict = [];
      codeSize = minCodeSize + 1;
      for (var i = 0; i < clearCode; i++) {
        dict[i] = [i];
      }
      dict[clearCode] = [];
      dict[eoiCode] = null;
  
    };
  
    var code;
    var last;
  
    while (true) {
      last = code;
      code = readCode(codeSize);
  
      if (code === clearCode) {
        clear();
        continue;
      }
      if (code === eoiCode) break;
  
      if (code < dict.length) {
        if (last !== clearCode  && typeof dict[last] !== 'undefined') {
          dict.push(dict[last].concat(dict[code][0]));
        }
      }
      else {
        if (code == dict.length && typeof dict[last] !== 'undefined') {
          dict.push(dict[last].concat(dict[last][0]));
        }
      }
      output.push.apply(output, dict[code]);
  
      if (dict.length === (1 << codeSize) && codeSize < 12) {
        codeSize++;
      }
    }
  
    return output;
  };
  
  return that;
};