"use strict";

var React  = require('react');
var ChatBoxHead = require('./chat_box_head.jsx');

var InPageChatBox = React.createClass({

  render: function() {
    return (
      <div id="chatyuk">
       <ChatBoxHead ref="chatBoxHead"/>
        <div className="chat-body" >
         <div className="chat-area">
           {this.props.children}
          </div>
        </div>
      </div>);
  }

});

module.exports = InPageChatBox;

