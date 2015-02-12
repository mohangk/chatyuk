/**
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
var emotify = Object.create(Emotify);

React.render(
  <ChatArea comms={comms} />,
  document.body
);
