"use strict";

var React  = require('react');
var Message = require('./message.jsx');

var MessagePane = React.createClass({
  componentDidMount: function() {
    this.props.comms.setOnMessageCb(this.addMessage);
  },

  getInitialState: function() {
    var messages = [];
    if(typeof this.props.messages != 'undefined') {
      messages = this.props.messages;
    }
    return {
      messages: messages
    };
  },

  componentWillUpdate: function() {
    var node = this.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight;
    }
  },

  addMessage: function(message) {
    var messages = this.state.messages;
    messages.push(message);
    this.setState({messages: messages});
  },

  render: function() {
    var messageNodes = this.state.messages.map(function(message, index) {

      return (
        <Message sender={message.sender} body={message.body} key={index} />
      );
    });

    return (
        <ul className="chat-content">
          {messageNodes}
        </ul>
    );
  }
});

module.exports = MessagePane;
