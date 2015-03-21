/* global window */

"use strict";

var React = require('react');
var XmppComms = require('./comms.js');
var ChatArea = require('./components/chat_area.jsx');

var comms = Object.create(XmppComms);

var Chatyuk = {

  defaultConfig: {
    display_mode: 'inpage'
  },

  init: function(parentEl, config) {
    this.initConfig(config);
    this.renderComponent(parentEl);
  },

  initConfig: function(customConfig) {
    this.config = Object.create(this.defaultConfig);
    for (var attrname in customConfig) { 
      this.config[attrname] = customConfig[attrname]; 
    }
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

