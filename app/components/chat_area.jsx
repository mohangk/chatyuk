"use strict";

var React  = require('react');
var ChatBoxHead = require('./chat_box_head.jsx');
var OnPageChatBox = require('./on_page_chat_box.jsx');
var InPageChatBox = require('./in_page_chat_box.jsx');
var MessagePane = require('./message_pane.jsx');
var LoggedInBox = require('./logged_in_box.jsx');
var LoginForm = require('./login_form.jsx');
var MessageBox = require('./message_box.jsx');

var ChatArea = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: this.props.comms.isConnected(),
      username: this.props.comms.username,
      room: this.props.comms.room
    };
  },

  updateState: function() {
    this.setState({
      loggedIn: this.props.comms.isConnected(),
      username: this.props.comms.username,
      room: this.props.comms.room
    });
  },

  loggedInAs: function(username, room) {
    this.props.comms.connect(username, '', room, this.updateState, this.updateState);
  },

  logout: function() {
    this.props.comms.disconnect();
    this.setState({ loggedIn: false, username: null, room: null });
  },

  chatBoxClass: function() {
    if(this.props.config.display_mode == 'inpage') {
      return InPageChatBox;
    } else {
      return OnPageChatBox;
    }
  },


  render: function() {
    var ChatBox = this.chatBoxClass();

    if(this.props. comms.isConnected()) { 
      return (
      <ChatBox>
        <MessagePane comms={this.props.comms} />
        <LoggedInBox logout={this.logout} username={this.state.username} room={this.state.room} />
        <MessageBox comms={this.props.comms} />
      </ChatBox>
      );
    } else {
      return (
        <ChatBox>
          <LoginForm loggedInAs={this.loggedInAs} username="test" room="testroom" />
        </ChatBox>
      );
    }

  }

});

module.exports = ChatArea;
