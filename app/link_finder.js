module.exports = {
  find: function(text) {
    var links = linkify.find(text);
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
    }
  },

  isImageExt: function(path) {
    var imageTypes = ['png', 'jpg', 'gif'];
    var ext = path.substring(path.length - 3).toLowerCase();
    return imageTypes.indexOf(ext) > -1;
  },

  isVidio: function(path) {
    return path.search(/vidio.com\/watch/) != -1
           || path.search(/vidio.com\/embed/) != -1;
  },

};
