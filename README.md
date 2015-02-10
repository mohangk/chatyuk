# Chatyuk!

Chatyuk! (Let chat!) is very early in its development phase. It hopes to grow up to an easy to embed multi user chatroom for any webpage.

![Crappy screenshot](/docs/imgs/screenshot.png?raw=true "Crappy screenshot")

## Installation

### JS code

1. Run `npm install` to install required packages for development
2. Install jsx -  `npm install react-tools -g`

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

## Features

1. Has basic emoticon support

## Todo

1. Add ability to send 
  - emoticons
  - embed images
  - gifs
  - youtube videos
  - vidio videos
1. Complete server setup in vagrant
1. Refactor current stylesheets - either move everything to React components or leave in stylesheet or halhway house ? 
1. Add sample on how to embed chatyuk on existing page
1. Add in page mode (a-la twitch or cliponyu)
1. Display roster
1. Presence (when people join or leave)
1. Prebinding and security - http://metajack.im/2009/12/14/fastest-xmpp-sessions-with-http-prebinding/
  - auto login to room
  - control rooms from server
1. Websocket support
1. Emoji picker
1. Add ability to set chat room name in chat window
1. Browserify or jspm.io
1. When I am chatting, although scrolled up, scroll the chat window down
1. Add the "More chats below" ala Twitch
1. Remove jQuery dependence in comms.js
1. Figure out best way to handle customization => themes, emoticons 
1. There is a DDOS vulnerability with LuaExpat 1.2 that ships with 14.04
1. HTTPs ?


## Credits

This project has borrowed/used/copied code from:

1. Converse.js - https://conversejs.org/
1. Strophe.js
1. Twemoji awesome - http://ellekasai.github.io/twemoji-awesome/
