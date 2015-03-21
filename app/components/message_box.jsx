"use strict";

var React  = require('react');

var MessageBox = React.createClass({

  sendMessage: function(e) {
    if(e.which == 13) {
      e.preventDefault();
      this.props.comms.groupchat(e.target.value);
      e.target.value = '';
    }
  },

  render: function() {
    return (
      <form className="sendXMPPMessage">
        <textarea placeholder="Message" className="chat-textarea" onKeyPress={this.sendMessage}></textarea>
      </form>
    );
  }

});

module.exports = MessageBox;
