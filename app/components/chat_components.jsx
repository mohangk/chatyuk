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

  componentWillUpdate: function() {
    var node = this.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight
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
      )
    });

    return (
        <ul className="chat-content">
          {messageNodes}
        </ul>
    );
  }
});

var Message = React.createClass({

  formatSender: function(sender) {
    return sender+":";
  },

  formatBody: function(text) {
    if(text == '' || typeof text == 'undefined') {
      return '';
    }
    
    var emoticons = { '>:)' :'smiling-imp',
                      ':)'  :'smiley',
                      ':-)' :'smiley',
                      ';)'  :'wink',
                      ';-)' :'wink',
                      ':D'  :'grin',
                      ':-D' :'grin',
                      ':P'  :'stuck-out-tongue',
                      ':-P' :'stuck-out-tongue',
                      ':p'  :'stuck-out-tongue',
                      ':-p' :'stuck-out-tongue',
                      '8)'  :'sunglasses',
                      ':S'  :'confused',
                      ':\\' :'pensive',
                      ':/'  :'pensive',
                      '>:(' :'angry',
                      ':('  :'disappointed',
                      ':-(' :'disappointed',
                      ':O'  :'open-mouth',
                      ':o'  :'open-mouth',
                      ':-O' :'open-mouth',
                      '=-O' :'open-mouth',
                      '<3'  : 'heart',
                      '(^.^)b' :'thumbsup' };

    var textArray = [text];

    for(var emoticon in emoticons) {
      textArray = this.tokenizeTextArray(emoticon, emoticons[emoticon], textArray);
    }

    return textArray;
  },


  tokenizeTextArray: function(emoticon, type, textArray) {

    textArray.forEach(function(text, index) {
      if(typeof text != 'string') { return; };

      var processedTextArray = this.tokenize(emoticon, type, text);
      this.spliceTextArray(textArray, index, processedTextArray);

    }, this);

    return textArray;
  },


  spliceTextArray: function(textArray, indexToSwap, newTextArrayElement) {
    var args = [indexToSwap, 1].concat(newTextArrayElement);
    Array.prototype.splice.apply(textArray, args);
  },


  tokenize: function(emoticon, type, text) {
    var textArray = text.split(emoticon);
    var processedTextArray=[];

    if(textArray.length == 1) {
      return textArray;
    }

    textArray.forEach(function(element, index) {
      processedTextArray.push(element);               

      if(index+1 < textArray.length) {
        processedTextArray.push(<Emoticon type={type} />);
      }
    });

    return processedTextArray;
  },


  render: function() {
    return(
      <li className='chat-message'>
        <span ref="sender" className="chat-message-room">{this.formatSender(this.props.sender)}</span>
        <span ref="body" className="chat-message-content" >{this.formatBody(this.props.body)}</span>
      </li>
    );
  }
});

var Emoticon = React.createClass({

  emoticonClass: function() {
    return 'twa twa-lg twa-'+this.props.type;
  },

  render: function() {
    return <i className={this.emoticonClass()}></i>
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
      return (<form className="sendXMPPMessage"> <textarea placeholder="Message" className="chat-textarea" onKeyPress={this.sendMessage}></textarea></form>)
  }
});

var ChatBox = React.createClass({
  
  getInitialState: function() {
    return {
      minimized: false,
      dragging: false,
      height: 400,
      lastDragY: 0,
    };
  },

  minimize: function() {
    this.setState({minimized: true});
  },

  maximize: function() {
    this.setState({minimized: false});
  },

  dragStart: function(e) {
    if(e.button !== 0) return;
    this.setState({
      dragging: true,
      lastDragY: e.pageY,
    });
    e.stopPropagation();
    e.preventDefault();
  },

  updateHeight: function(e, dragging) {
    var height = this.state.height + (this.state.lastDragY - e.pageY);
    this.setState({dragging: dragging, lastDragY: e.pageY, height: height});
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp: function (e) {
    this.updateHeight(e, false);
  },

  onMouseMove: function (e) {
    if (!this.state.dragging) return
    this.updateHeight(e, true);
  },

  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },

  render: function() {

    var controlBoxStyle = {
      display: (this.state.minimized ? 'block' : 'none')
    }

    var chatRoomStyle = {
      display: (!this.state.minimized ? 'block' : 'none')
    }
    var dragResizeStyle = {
      position: 'absolute',
      width: 200,
      height: 5,
      background: 'transparent',
      border: 0,
      top: 0,
      marginLeft: 0,
      cursor: 'n-resize',
      zIndex: 20
    }

    var boxFlyoutStyle = {
      borderRadius: 4,
      boxShadow: '1px 3px 5px 3px rgba(0, 0, 0, 0.4)',
      height: this.state.height,
      position: 'absolute',
      display: 'block',
      bottom: 5,
      width: 300,
      marginLeft: 0
    }

    return (
         <div id="chatyuk">
         <a href="#" onClick={this.maximize}  style={controlBoxStyle} id="toggle-controlbox" className="toggle-controlbox"><span className="conn-feedback">Toggle chat</span> </a>
         <div style={chatRoomStyle} className="chatroom">
           <div className="box-flyout" style={boxFlyoutStyle} >
             <div className="dragresize dragresize-tm" onMouseDown={this.dragStart} style={dragResizeStyle}></div>
             <div className="chat-head chat-head-chatroom">
                <a onClick={this.minimize} className="toggle-chatbox-button icon-minus"></a>
                <div className="chat-title"> Chatroom </div>
                <p className="chatroom-topic">May the force be with you</p>
            </div>
             <div className="chat-body" >
             <div className="chat-area">
             {this.props.children}
             </div>
           </div>
         </div>
       </div>
       </div>
     );
  }
});


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
    this.setState({loggedIn: false, username: null, room: null})
  },

  render: function() {

    if(this.props.comms.isConnected()) { 
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
