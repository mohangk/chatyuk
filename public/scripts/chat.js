/**
 * Component strucutre is
 *
 * - Chatbox
 *  - MessagePane
 *  - MassageForm
 * - LoginForm
 */

var  LoginForm = React.createClass({
  handleSubmit: function(e) {
    console.log('I have been submitted',e);
  },
  render: function() {
    return (
      <form name='cred' onSubmit={this.handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input type='text' id='username' defaultValue={this.props.username}/>
        <label htmlFor='pass'>Password:</label>
        <input type='password' id='pass' defaultValue=""/>
        <label htmlFor='room'>Room:</label>
        <input type='text' id='room' defaultValue={this.props.room}/>
        <input type='button' id='connect' value='connect'/>
      </form>
    );
  }
});

React.render(
  <LoginForm username="test" room="testroom" />,
  document.getElementById('content')
);
