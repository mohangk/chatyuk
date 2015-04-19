"use strict";

var React  = require('react');
var ChatBoxHead = require('./chat_box_head.jsx');

var InPageChatBox = React.createClass({

  render: function() {
    return (
      <div id="chatyuk">
        <ChatBoxHead ref="chatBoxHead"/>
        <div className="chat-body" >
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = InPageChatBox;

