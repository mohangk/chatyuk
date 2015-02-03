/**
 * TODO
 * 0. Refactor current stylesheets, figure out best way to work with react and custom templates
 * 1. Add ability to send emoticons, images, gifs
 * 2. Setup sample embed, update README with screenshots
 * 3. Add in page mode (a-la twitch or cliponyu)
 * 4. When I am chatting, although scrolled up, scroll the chat window done
 * 5. Add the "More chats below" ala Twitch
 * 6. Prebinding and security - http://metajack.im/2009/12/14/fastest-xmpp-sessions-with-http-prebinding/
 * 7. Add tests for React components
 * 8. Display roster
 * 9. Presence (when people join or leave)
 * 10. Browserify or jspmo
 * 11. Remove jQuery dependence in comms.js
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
