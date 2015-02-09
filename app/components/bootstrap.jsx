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

React.render(
  <ChatArea comms={comms} />,
  document.body
);
