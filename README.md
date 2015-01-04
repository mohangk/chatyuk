# Chatyuk!

Chatyuk! (Let chat!) is very early in its development phase. It hopes to grow up to an easy to embed multi user chatroom for any webpage.

## Installation

### JS code

1. Run `npm install` to install required packages for development
2. Install jsx -  `npm install react-tools -g`

### Server component

Run `vagrant up` (This is not completed yet)

## Run the code

1. Run `npm run-script build-components` to continuosly build the code.
2. In the root directory run `python -m SimplehHTTPServer`
3. Access the application at http://localhost:8000/public/chat.html

## Run tests

1. Run `npm run-script build-tests` to continuosly build the tests.
2. In the root directory run `python -m SimplehHTTPServer`
3. Access the tests at http://localhost:8000/jasmine/SpecRunner.html
