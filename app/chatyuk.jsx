/* global window */

"use strict";

var React = require('react');
var XmppComms = require('./comms.js');
var ChatArea = require('./components/chat_area.jsx');

var comms = Object.create(XmppComms);

var Chatyuk = {

  defaultConfig: {
    display_mode: 'inpage',
    chat_server: 'chatyuk.com',
    conference_server: 'conference.chatyuk.com'
  },

  init: function(parentEl, config) {
    this.initConfig(config);

    comms.init();
    this.renderComponent(parentEl);
  },

  initConfig: function(customConfig) {
    this.config = Object.create(this.defaultConfig);
    for (var attrname in customConfig) { 
      this.config[attrname] = customConfig[attrname]; 
    }

    comms.setServerConfig(this.config.chat_server, this.config.conference_server);
  },

  renderComponent: function(parentEl) {
    React.render(
      <ChatArea comms={comms} config={this.config} />,
      parentEl
    );
  }
};

window.Chatyuk = Chatyuk;

module.exports = Chatyuk;

