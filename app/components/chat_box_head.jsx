var React  = require('react');

var styles = {
  head: {
    margin:                   '-1px -1px 0',

    background:               '#4e69a2',

    color:                    'white',
    fontSize:                 12,
    fontWeight:               'bold',
    textShadow:               '0 -1px rgba(0, 0, 0, .25)',

    border:                   '1px solid #2e4588',
    borderBottom:             'none',

    borderTopLeftRadius:      3,
    borderTopRightRadius:     3,

    cursor:                   'pointer'
  },

  title: {
    margin:                   5,
    fontSize:                 12
  }

};


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
      <div style={styles.head} className="chat-head chat-head-chatroom">
        { this.minimizeButton() }
        <div style={styles.title} className="chat-title">Chatroom</div>
      </div>
    );
  }

});

module.exports = ChatBoxHead;
