var LoggedInBox = React.createClass({
  render: function() {
    return (
      <span> Logged in as {this.props.username} in {this.props.room} <input type="button" value="Logout" onClick={this.props.logout} /> </span>
    );
  }
});

var LoginForm = React.createClass({
  doLogin: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var room = this.refs.room.getDOMNode().value.trim();
    this.props.loggedInAs(username, room)
  },
  render: function() {
      return (<form  onSubmit={this.doLogin}>
        <label htmlFor='username'>Username:</label>
        <input type='text' ref='username' defaultValue={this.props.username}/>
        <label htmlFor='room'>Room:</label>
        <input type='text' ref='room' defaultValue={this.props.room}/>
        <input type='submit' value='Join!'/>
      </form> )
  }
});

var Avatar = React.createClass({
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
    this.props.comms.connect(username, '', room, this.updateState.bind(this), this.updateState.bind(this));
  },

  logout: function() {
    this.props.comms.disconnect();
    this.setState({loggedIn: false, username: null, room: null})
  },

  render: function() {
    if(this.state.loggedIn) {
     return ( <div>
               <MessageBox comms={comms} /> 
               <br/>
               <LoggedInBox logout={this.logout} username={this.state.username} room={this.state.room} />
             </div> )
    } else {
     return ( <LoginForm loggedInAs={this.loggedInAs} username="test" room="testroom" /> )
    }
  }
});

var MessagePane = React.createClass({
  componentDidMount: function() {
    this.props.comms.setOnMessageCb(this.addMessage);
  },

  getInitialState: function() {
    var messages = []
    if(typeof(this.props.messages) != 'undefined') {
      messages = this.props.messages;
    }
	  return {
      messages: messages
    };
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
      <ul className="message-pane">
        {messageNodes}
      </ul>
    );
  },

});

var Message = React.createClass({
  render: function() {
    return(
      <li>{this.props.sender}:{this.props.body}</li>
    );
  }
});

var MessageBox = React.createClass({
  sendMessage: function(e) {
    if(e.which == 13) {
      e.preventDefault();
      this.props.comms.groupchat(e.target.value)
      e.target.value = '';
    }
  },
  render: function() {
      return (<textarea onKeyPress={this.sendMessage}></textarea>)
  }
});
