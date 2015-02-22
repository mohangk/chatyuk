LinkFinder = {
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
    }
  },

  isImageExt: function(path) {
    var imageTypes = ['png', 'jpg', 'gif'];
    var ext = path.substring(path.length - 3).toLowerCase();
    return imageTypes.indexOf(ext) > -1;
  }

};
