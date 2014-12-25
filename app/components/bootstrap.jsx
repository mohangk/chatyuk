/**
 * TODO
 * 0. Finish basic UI components 
 * 1. Add some testing
 * 2. Add some basic styling - look at converse.js 
 *   - embed to an existing page
 *   - must be able to fold and open
 * 3. Browserify
 * 4. Display roster
 * 5. Presence (when people join or leave)
 * 6. Prebinding
 *    -http://metajack.im/2009/12/14/fastest-xmpp-sessions-with-http-prebinding/
 *
 * 7. Remove jQuery dependence in comms.js
 *
 * Component strucutre is
 *
 *- Chatbox
 * - MessagePane (done)
 *  - Message (done)
 *  - Message
 * - MessageBox
 * - Avatar
 *   - LoginForm/LoggedInBox
 */


var comms = Object.create(XmppComms);

React.render(
  <Avatar comms={comms} />,
  document.getElementById('avatar')
);

React.render(
  <MessagePane comms={comms} />,
  document.getElementById('message-pane')
);
