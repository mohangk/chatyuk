var React = require('react');
var XmppComms = require('./comms.js');
var ChatArea = require('./components/chat_area.jsx');

var comms = Object.create(XmppComms);

React.render(
  <ChatArea comms={comms} />,
  document.body
);
