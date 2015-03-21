/* global window */

"use strict";

require('../deps/linkify.js');

module.exports = {

  find: function(text) {
    var links = window.linkify.find(text);
    return this.remapTypes(links);
  },

  remapTypes: function(links) {
    links.forEach(function(link, index) {
      this.remapType(link);
    }, this);

    return links;
  },

  remapType: function(link) {
    if(this.isImageExt(link.href)) {
        link.type = 'image';
    } else if(this.isVidio(link.href)) {
        link.type = 'vidio';
    } else if (this.isYoutubeLink(link.href)) {
        link.type = 'youtube';
    }
  },

  isImageExt: function(path) {
    var imageTypes = ['png', 'jpg', 'gif'];
    var ext = path.substring(path.length - 3).toLowerCase();
    return imageTypes.indexOf(ext) > -1;
  },

  isVidio: function(path) {
    return (path.search(/vidio.com\/watch/) != -1) ||
           (path.search(/vidio.com\/embed/) != -1);
  },

  isYoutubeLink: function(link) {
    return link.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/) !== null;
  }

};
