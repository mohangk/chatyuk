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

## Integrating into a page

1. Add the application bundle to your page like and and initialize the Chatyuk app like so
```
<script type="text/javascript" src="path/to/scripts/bundle.js" >
<script type="text/javascript">
  Chatyuk.init(document.querySelector('#chatarea'), {display_mode: 'onpage'});
</script>
```
1. Chatyuk.init(element, config);
config accepts the following keys
  * display_mode 
    - 'onpage', the chat window floats on an existing page
    - 'inpage', the chat window is embedded into the page



## Features

1. Has basic emoticon support
2. Detects urls and embeds 
  - images and gifs
  - youtube videos
  - vidio videos
  - links into clickable links
  into chat window.

## Todo

1. Add in page mode (a-la twitch or cliponyu)
1. Figure out if using browserify for the main Chatyuk object will be a hinderance when integrating with websites that also use some form of modules
1. Add acceptance testing using nightwatch.js
  - http://www.slideshare.net/sethmcl/join-the-darkside-nightwatchjs
1. Add sample on how to embed chatyuk on existing page
1. Improve default style 
  - Scrollbar in chat window is ugly
  - Vidio embed is not sized correctly
  - Removed unused CSS in chatyuk.css file
1. Remove hardcoded domain names from both client and server configurations
1. Fix bug with rejoining rooms. converse.js had the same issue and they fixed it be removing strophe.muc.js, yikes
  - https://github.com/jcbrand/converse.js/issues/307
1. Implement sample server code to create a pre-bound session
  - Prebinding and security - http://metajack.im/2009/12/14/fastest-xmpp-sessions-with-http-prebinding/
  - auto login to room
  - control rooms from server
1. Refactor current stylesheets - either move everything to React components or leave in stylesheet or halhway house ? 
1. Display roster
1. Presence (when people join or leave)
1. How would we set certain users as admins ?
  - Identify them in the roster
  - Give them the ability to ban users 
1. Automatically kick abusive users out of rooms
1. Websocket support
1. Deps management - Use browserify-shim for strophe and linkifyjs. Stop changing code for strophe. 
1. Emoji/Image picker
1. Add ability to set chat room name in chat window
1. When I am chatting, although scrolled up, scroll the chat window down
1. Add the "More chats below" ala Twitch
1. Figure out best way to handle customization => themes, emoticons 
1. There is a DDOS vulnerability with LuaExpat 1.2 that ships with 14.04
1. HTTPs ?


## Development

### Adding tests

1. Code should be acompanied with tests.
1. Add test file to jasmine/spec/ as per the structure of the actual code in the app folder. For e.g. tests for app/comms.js go into  jasmine/spec/comms_spec.js, tests for app/components/message.jsx go into jasmine/spec/components/message_spec.jsx
1. Add a require entry to the relevant spec file in jasmine/spec/suite.js, it should be automatically picked up by browserify and included in the specs.

### Adding code

1. Code entry points is app/chatyuk.jsx.
1. General code goes into app/
1. Add all UI related components into app/components.
1. Create directories to keep commmon files together.


### React.js component structure

 - Chatbox
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
