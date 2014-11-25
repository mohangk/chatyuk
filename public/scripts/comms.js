//TODO
// Super simple UI
// Display roster
// Presence (when people join or leave)
// Prebinding
//   -http://metajack.im/2009/12/14/fastest-xmpp-sessions-with-http-prebinding/
//
// Join a room, creating one if it does not already exist (done)
// Show room messages - from who, actual message (done)
// Send a message (done)
// Anonymous logins(done)

var XmppComms = {
  
  var CHAT_SERVER = 'chatyuk.com'
  var CONFERENCE_SERVER = 'conference.chatyuk.com'
  var BOSH_SERVICE = 'http://'+CHAT_SERVER+':5280/http-bind'
  var connection = null;
  var username = null;
  var password = null;
  var room = null;

  function connect(username, password, room) {
    this.connection = new Strophe.Connection(BOSH_SERVICE);
    this.connection.rawInput = rawInput;
    this.connection.rawOutput = rawOutput;

    this.username = username;
    this.password = password;
    this.room = this.roomDefinition(room);

    success = connection.connect(jid(),
                       password(),
                       onConnect);
    if(!success) {
      connection.disconnect();
      return false;
    } else {
      return true;
    }
  }

  function onMessage(message, room) {
    var $message = $(message),
        body = $message.children('body').text(),
        jid = $message.attr('from'),
        resource = Strophe.getResourceFromJid(jid),
        sender = resource && Strophe.unescapeNode(resource) || '',
        delayed = $message.find('delay').length > 0,
        subject = $message.children('subject').text();
        // UI $('#message-pane').append('<li>'+sender+':'+body+'</li>')
        console.log('messagecallback', message);
    return true;
  }

  function rawInput(data) {
      console.log('RECV: ',data);
  }

  function rawOutput(data) {
      console.log('SENT: ',data);
  }

  function onConnect(status) {
    if (status == Strophe.Status.CONNECTING) {
      console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
      console.log('Strophe failed to connect.');
      // UI $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
      console.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
      console.log('Strophe is disconnected.');
      //UI $('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
      console.log('Strophe is connected.');
      //UI $('#message').attr('disabled', false);
      connection.muc.join(room(), username(), onMessage, log, log);
    }
  }

  function jid() {
    //if password is blank we assume this is an anonymous login
    if(this.password == '') {
      return CHAT_SERVER;
    } else {
      return this.username+'@'+CHAT_SERVER;
    }
  }

  function roomDefinition(room) {
    return this.room+'@'+CONFERENCE_SERVER;
  }

}
