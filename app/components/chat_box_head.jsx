var React  = require('react');
var ChatBoxHead = React.createClass({

  minimizeButton: function() {
    var minimizeButton =  '';

    if(this.props.onMinimize) { 
      var minimizeButton = <a ref="minimizeButton" onClick={this.props.onMinimize} className="toggle-chatbox-button icon-minus"></a>;
    }

    return minimizeButton;
  },

  render: function() {
    return (
      <div className="chat-head chat-head-chatroom">
        { this.minimizeButton() }
        <div className="chat-title"> Chatroom </div>
        <p className="chatroom-topic"></p>
      </div>
    );
  }

});

module.exports = ChatBoxHead;
