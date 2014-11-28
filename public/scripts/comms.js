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

  CHAT_SERVER:  'chatyuk.com',
  CONFERENCE_SERVER:  'conference.chatyuk.com',
  connection: null,
  username: null,
  password: null,
  room: null,
  currentStatus: null,

  boshServiceUrl: function() {
    return 'http://'+this.CHAT_SERVER+':5280/http-bind';
  },

  connect: function(username, password, room) {

    this.connection = new Strophe.Connection(this.boshServiceUrl());
    this.connection.rawInput = this.rawInput;
    this.connection.rawOutput = this.rawOutput;

    this.username = username;
    this.password = password;
    this.room = room;

    success = this.connection.connect(this.jid(),
                       this.password,
                       this.onConnect);
    if(!success) {
      this.connection.disconnect();
      return false;
    } else {
      return true;
    }
  },

  onMessage: function(message, room) {
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
  },

  rawInput: function(data) {
      console.log('RECV: ',data);
  },

  rawOutput: function(data) {
      console.log('SENT: ',data);
  },

  onConnect: function(status) {
    this.currentStatus =  status;
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
      connection.muc.join(roomAndServer(), username(), onMessage, log, log);
    }
  },

  jid: function() {
    //if password is blank we assume this is an anonymous login
    if(this.password == '') {
      return this.CHAT_SERVER;
    } else {
      return this.username+'@'+this.CHAT_SERVER;
    }
  },

  roomAndServer: function() {
    return this.room+'@'+this.CONFERENCE_SERVER;
  },
}
