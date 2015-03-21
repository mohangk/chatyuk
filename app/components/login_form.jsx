var React  = require('react');
var m      = require('./../utils/merge');

var styles = {
  input: {
    display:      'block',
    boxSizing:    'border-box',

    width:        '100%',
  }
}

styles.inputText = m(styles.input, {
    height:       '30px',

    padding:      '0 5px',
    border:       '0px solid #ccc',
    borderBottom: '2px solid #ccc'
});

styles.inputButton = m(styles.input, {
    padding:      '5px',
    border:       '0px solid #ccc',

    fontWeight:   'bold'
});


var LoginForm = React.createClass({

  doLogin: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var room = this.refs.room.getDOMNode().value.trim();
    this.props.loggedInAs(username, room);
  },

  render: function() {
      return (
        <form onSubmit={this.doLogin}>
          <input type='text'   defaultValue={this.props.username} name='username'  ref='username' placeholder='Username' style={styles.inputText} />
          <input type='text'   defaultValue={this.props.room}     name='room'      ref='room'     placeholder='Room'     style={styles.inputText} />
          <input type='submit' value='Join!'                                                                             style={styles.inputButton} />
        </form>
      );
  }
});

module.exports = LoginForm;
