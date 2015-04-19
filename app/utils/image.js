"use strict";

function immutableImage(img) {
  return {
    complete: img.complete,
    width:    img.naturalWidth,
    height:   img.naturalHeight
  };

};

var ImageUtil = {

  getDimensions: function(src, callback) {
    var img = new Image();
    img.src = src;

    if(img.complete) {
      return immutableImage(img);
    }

    img.onload = function(){
      callback.call();
    };

    return immutableImage(img);
  }

};

module.exports = ImageUtil;

