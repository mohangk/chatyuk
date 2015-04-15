"use strict";
var docCookies = require('./utils/cookies.js');
var Strophe = require('./deps/strophe.js');
              require('./deps/strophe.muc.js');

module.exports =  {

  connection: null,
  username: null,
  password: null,
  room: null,
  currentStatus: null,
  onConnectedCb: null,
  onDisconnectedCb: null,
  onMessageCb: null,


  init: function() {
    if(this.connection === null){
      this.connection = new Strophe.Connection(this.boshServiceUrl());
      this.connection.rawInput = this.rawInput;
      this.connection.rawOutput = this.rawOutput;
    } else {
      this.connection.reset();
    }

    this.restoreSession();
  },

  setServerConfig: function(chat_server, conference_server) {
    this.CHAT_SERVER = chat_server;
    this.CONFERENCE_SERVER = conference_server;
  },

  registerCallbacks: function(onConnectedCb, onDisconnectedCb, onMessageCb) {

    if(this.isCallbackSet(onConnectedCb)) {
      this.onConnectedCb = onConnectedCb;
    }

    if(this.isCallbackSet(onDisconnectedCb)) {
      this.onDisconnectedCb = onDisconnectedCb;
    }

    if(this.isCallbackSet(onMessageCb)) {
      this.onMessageCb = onMessageCb;
    }
  },

  setOnMessageCb: function(onMessageCb) {
    this.onMessageCb = onMessageCb;
  },

  isCallbackSet: function(cb) {
    return (cb !== null && typeof(cb) != 'undefined');
  },

  connect: function(username, password, room) {

    this.username = username;
    this.password = password;
    this.room = room;
    this.connection.connect(this.jid(),
                       this.password,
                       this.onServerConnect.bind(this));
  },

  saveSession: function() {
    console.log('start saveSession');
    console.log('sid', this.connection._proto.sid, 'rid', this.connection._proto.rid);
    docCookies.setItem('chatyuk_user', this.username);
    docCookies.setItem('chatyuk_room', this.room);
    docCookies.setItem('chatyuk_sid', this.connection._proto.sid);
    docCookies.setItem('chatyuk_rid', this.connection._proto.rid);
    console.log('end saveSession');
  },

  hasPriorSession: function(){
    return (docCookies.getItem('chatyuk_sid') != 'null' && 
      docCookies.getItem('chatyuk_rid') != 'null' && 
      docCookies.getItem('chatyuk_user') != 'null' && 
      docCookies.getItem('chatyuk_room') != 'null');
  },

  restoreSession: function(){
    if(this.hasPriorSession()) {
      var sid = docCookies.getItem('chatyuk_sid');
      var rid = parseInt(docCookies.getItem('chatyuk_rid'));
      this.username = docCookies.getItem('chatyuk_user');
      this.room = docCookies.getItem('chatyuk_room');

      this.connection.attach(this.jid(), sid, rid, this.onServerConnect.bind(this));
    }
  },

  disconnect: function() {
    this.connection.muc.leave(this.roomAndServer(), this.username, function() { this.connection.disconnect(); }.bind(this));
  },

  log: function() {
    console.log('IN CB', arguments);
    return true;
  },

  onMessage: function(message, room) {
    console.log("IN comms::onMessage - this.onMesage");

    var messageBody = message.getElementsByTagName('body')[0];
    var body = messageBody.innerHTML;

    var jid = message.getAttribute('from');
    var resource = Strophe.getResourceFromJid(jid);
    var sender = resource && Strophe.unescapeNode(resource) || '';

    this.onMessageCb({ body: body, sender: sender });

    console.log('IN comms::onMessage - return');

    return true;
  },

  rawInput: function(data) {
      console.log('RECV: ',data);
  },

  rawOutput: function(data) {
      console.log('SENT: ',data);
  },

  onServerConnect: function(status) {
    this.currentStatus =  status;
    if (status == Strophe.Status.CONNECTING) {
      console.log('Strophe is connecting.');
    }
    else if (status == Strophe.Status.CONNFAIL) {
      console.log('Strophe failed to connect.');
      if(this.isCallbackSet(this.onDisconnectedCb)) {
        this.onDisconnectedCb();
      }
    }
    else if (status == Strophe.Status.DISCONNECTING) {
      console.log('Strophe is disconnecting.');
    }
    else if (status == Strophe.Status.DISCONNECTED) {
      console.log('Strophe is disconnected.');
      if(this.isCallbackSet(this.onDisconnectedCb)) {
        this.onDisconnectedCb();
      }
    }
    else if (status == Strophe.Status.CONNECTED || status == Strophe.Status.ATTACHED) {
      console.log('Strophe is connected.');
      if(this.isCallbackSet(this.onConnectedCb)) {
        this.onConnectedCb();
      }
      console.log(">> IN comms::onServerConnnect - set this.onMesage");

      this.connection.muc.join(this.roomAndServer(), this.username, this.onMessage.bind(this), this.log, this.log);
    }
  },

  jid: function() {
    //if password is blank we assume this is an anonymous login
    if(this.password === '') {
      return this.CHAT_SERVER;
    } else {
      return this.username+'@'+this.CHAT_SERVER;
    }
  },

  roomAndServer: function() {
    return this.room+'@'+this.CONFERENCE_SERVER;
  },

  isConnected: function() {
    return (this.currentStatus == Strophe.Status.CONNECTED || this.currentStatus == Strophe.Status.ATTACHED);
  },

  groupchat: function(message) {
    this.connection.muc.groupchat(this.roomAndServer(), message);
  },

  boshServiceUrl: function() {
    return 'http://'+this.CHAT_SERVER+':5280/http-bind';
  },

};
