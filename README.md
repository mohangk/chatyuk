# Chatyuk!

Chatyuk! (Let chat!) is very early in its development phase. It hopes to grow up to an easy to embed multi user chatroom for any webpage.

![Crappy screenshot](/docs/imgs/screenshot.png?raw=true "Crappy screenshot")

## Installation

### JS code

1. Run `npm install` to install required packages for development
2. Install browserify globally `npm install browserify -g`
3. Install watchify globally `npm install watchify -g`


### Server component

Run `vagrant up`

### Host setup

Due to the way some of the configurations are hardcoded now, you will need to add these following 2 settings to your /etc/hosts file. 

```
127.0.0.1 chatyuk.com
127.0.0.1 conference.chatyuk.com
```

## Run the code

1. Run `npm run-script build-components` to continuosly build the code.
2. In the root directory run `python -m SimpleHTTPServer`
3. Access the application at http://localhost:8000/public/chat.html

## Run tests

1. Run `npm run-script build-tests` to continuosly build the tests.
2. In the root directory run `python -m SimpleHTTPServer`
3. Access the tests at http://localhost:8000/jasmine/SpecRunner.html
4. To run the acceptance tests `npm run nightwatch`

## Integrating into a page

1. Add the application bundle to your page like and and initialize the Chatyuk app like so
```
<script type="text/javascript" src="path/to/scripts/bundle.js" >
<script type="text/javascript">
  Chatyuk.init(document.querySelector('#chatarea'), {display_mode: 'onpage'});
</script>
```
1. Chatyuk.init(parentElement, config);
config accepts the following keys

  * display_mode 
    - 'onpage', the chat window floats on an existing page
    - 'inpage', the chat window is embedded into the page
    In both cases we create a new child div to the parentElement 
    and use that as the container for Chatyuk. This is to ensure that any children are not replaced by React.render.

  * bosh_service_url
  * chat_server
  * conference_server

## Features

1. Has basic emoticon support
2. Detects urls and embeds 
  - images and gifs
  - youtube videos
  - vidio videos
  - links into clickable links
  into chat window.
3. Has different display modes
  - in page - embed the chat window into a particular div on your page
  - on page - a floating window that can be minimised a-la FB chat that can be easily added to any page

## Todo

1. Update documentation
  1. Remove hardcoded domain names from both client and server configurations (we should be able to leave them empty)
1. Chatyuk should expose an API to set a username and join a chatroom by default
1. Notify user when there is a chat directed at her
  1. Notify in title of window 
  1. Look at using chrome notifications if available ?
1. Session management issues
  1. Instead of setting 3 cookies, only set 1 for session management
  1. Session management is flaky at times, seen more then one chatyuk cookie for the same session
  1. When rejoining rooms on reloadig a page, we loose all messages from the room. Maybe there is a way to get the prior messages ?
1. Create a script that will run both jasmine and acceptance test headless so that we can run it on a CI
  - Running nightwatch headleass - https://github.com/beatfactor/nightwatch/wiki/Running-tests-in-PhantomJS
1. Add source maps to help with debugging
1. Improve default style 
  - Scrollbar in chat window is ugly
  - On Firefox when display_mode = 'inpage', the messagepane is not expanded
  - Removed unused CSS in chatyuk.css file
1. Websocket support
1. Figure out why converse.js dumped the muc plugin ?
  - https://github.com/jcbrand/converse.js/issues/307
1. Implement sample server code to create a pre-bound session and integrate with comms.js
  - Ruby lib to create prebound sessions
    - https://github.com/skyfallsin/ruby_bosh
  - Django example
    - http://metajack.im/2008/10/03/getting-attached-to-strophe/
  - Example of client connecting to prebound session 
    - https://github.com/node-xmpp/node-xmpp-client/blob/master/examples/prebind.js
    - https://github.com/strophe/strophejs/blob/master/examples/prebind.html
  - End obj - auto login to room based on auth from the server
1. Disable the ability for clients to connect apart from getting a prebound connection from the server
1. Admin controls
  - control rooms from server, valid rooms vs auto created rooms
1. Refactor current stylesheets - either move everything to React components or leave in stylesheet or halhway house ? 
1. Display roster
1. UI elements for presence (when people join or leave)
1. How would we set certain users as admins ?
  - Identify them in the roster
  - Give them the ability to ban users 
1. Automatically kick abusive users out of rooms
1. Deps management - Use browserify-shim for strophe and linkifyjs. Stop changing code for strophe.
1. Emoji/Image picker
1. Add ability to set chat room name in chat window
1. When I am chatting, although scrolled up, scroll the chat window down
1. Add the "More chats below" ala Twitch
1. Figure out best way to handle customization => themes, emoticons 
1. There is a DDOS vulnerability with LuaExpat 1.2 that ships with 14.04
1. HTTPs ?
1. Error handling for cases where the server sends back an error when you try to send a message
    - comms.js in onMessage, if there is an error the messageBody will be undefined as the body element is not in the response. 

## Development

### Adding tests

1. Code should be acompanied with tests.
1. If it is a new user facing feature, add an acceptance test to tests/acceptance as well.
1. Add test file to jasmine/spec/ as per the structure of the actual code in the app folder. For e.g. tests for app/comms.js go into  jasmine/spec/comms_spec.js, tests for app/components/message.jsx go into jasmine/spec/components/message_spec.jsx
1. Add a require entry to the relevant spec file in jasmine/spec/suite.js, it should be automatically picked up by browserify and included in the specs.

### Adding code

1. Code entry points is app/chatyuk.jsx.
1. General code goes into app/
1. Add all UI related components into app/components.
1. Create directories to keep commmon files together.
1. Always use strict mode. Add "use strict"; to the top of your js or jsx files.
1. Ensure both your code and tests pass jshint by running `npm run jshint` before committing.


### React.js component structure

 - Chatbox (InPageChatbox, OnPageChatbox)
  - ChatBoxHead
  - MessagePane
   - Message
   - Message
  - LoginForm/LoggedInBox
  - MessageBox

## Notes

  - Parsing links from text - http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links


## Credits

This project has borrowed/used/copied code from:

1. Converse.js - https://conversejs.org/
1. Strophe.js
1. Twemoji awesome - http://ellekasai.github.io/twemoji-awesome/
1. Linkify - https://github.com/SoapBox/jQuery-linkify
