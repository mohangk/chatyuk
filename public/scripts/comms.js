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
  onConnectedCb: null,
  onDisconnectedCb: null,
  onMessageCb: null,

  boshServiceUrl: function() {
    return 'http://'+this.CHAT_SERVER+':5280/http-bind';
  },

  connect: function(username, password, room, onConnectedCb, onDisconnectedCb, onMessageCb) {

    if (this.connection === null) {
      this.connection = new Strophe.Connection(this.boshServiceUrl());
      this.connection.rawInput = this.rawInput;
      this.connection.rawOutput = this.rawOutput;
    } else {
      this.connection.reset();
    }


    this.username = username;
    this.password = password;
    this.room = room;
    this.onConnectedCb = onConnectedCb;
    this.onDisconnectedCb = onDisconnectedCb;
    this.onMessageCb = onMessageCb;

    this.connection.connect(this.jid(),
                       this.password,
                       this.onConnect.bind(this));
  },

  disconnect: function() {
    this.connection.muc.leave(this.roomAndServer(), this.username, function() {console.log('disconnect callback is called'); this.connection.disconnect() }.bind(this));
  },

  log: function()
  {
    console.log('IN CB', arguments)
    return true;
  },

  onMessage: function(message, room) {
    var $message = $(message),
        body = $message.children('body').text(),
        jid = $message.attr('from'),
        resource = Strophe.getResourceFromJid(jid),
        sender = resource && Strophe.unescapeNode(resource) || '',
        delayed = $message.find('delay').length > 0,
        subject = $message.children('subject').text();
    this.onMessageCb({ body: body, sender: sender });
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
      this.onDisconnectedCb();
    } else if (status == Strophe.Status.DISCONNECTING) {
      console.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
      console.log('Strophe is disconnected.');
      this.onDisconnectedCb();
    } else if (status == Strophe.Status.CONNECTED) {
      console.log('Strophe is connected.');
      this.onConnectedCb();
      this.connection.muc.join(this.roomAndServer(), this.username, this.onMessage.bind(this), this.log, this.log);
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

  isConnected: function() {
    return (this.currentStatus == Strophe.Status.CONNECTED);
  },

  groupchat: function(message) {
    this.connection.muc.groupchat(this.roomAndServer(), message);
  }

}
