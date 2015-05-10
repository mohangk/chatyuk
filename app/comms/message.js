var Strophe = require('app/deps/strophe.js');

module.exports = {
  bodyEl: null,

  fromEl: null,

  init: function(message) {
    this.parseBody(message);
    this.parseFrom(message);
  },

  parseBody: function(message) {
    var messageBody = message.getElementsByTagName('body')[0];
    this.bodyEl = messageBody.innerHTML;
  },

  parseFrom: function(message) {
    this.fromEl = message.getAttribute('from'); 
  },

  body: function() {
    return this.bodyEl;
  },

  sender: function() {
    var resource = Strophe.getResourceFromJid(this.fromEl);
    return resource && Strophe.unescapeNode(resource) || '';
  }

}
