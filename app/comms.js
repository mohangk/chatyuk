"use strict";

var session = require('app/comms/session_manager.js');
var Message = require('app/comms/message.js');
var Strophe = require('app/deps/strophe.js');
              require('app/deps/strophe.muc.js');

module.exports =  {

  boshServiceUrl: null,
  chatServer: null,
  conferenceServer: null,
  connection: null,
  username: null,
  password: null,
  room: null,
  currentStatus: null,
  onConnectedCb: null,
  onDisconnectedCb: null,
  onMessageCb: null,


  init: function(boshServiceUrl, chatServer, conferenceServer) {
    this.setConfig(boshServiceUrl, chatServer, conferenceServer);

    if(this.connection === null){
      this.connection = new Strophe.Connection(this.boshServiceUrl);
      this.connection.rawInput = this.rawInput;
      this.connection.rawOutput = this.rawOutput;
    } else {
      this.connection.reset();
    }

    this.restoreSession();
  },

  setConfig: function(boshServiceUrl, chatServer, conferenceServer) {

    if(!this.isConfigSet(boshServiceUrl) ||
       !this.isConfigSet(chatServer)     ||
       !this.isConfigSet(conferenceServer)) {
      throw new TypeError('boshServiceUrl and conferenceServer must be set');
    }

    this.boshServiceUrl = boshServiceUrl;
    this.chatServer = chatServer;
    this.conferenceServer = conferenceServer;
  },

  isConfigSet: function(configValue){
    return (configValue !== null &&
            configValue !== ''   &&
            typeof(configValue) != 'undefined');
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
    var details = {
      username: this.username,
      room: this.room,
      sid: this.connection._proto.sid,
      rid: this.connection._proto.rid
    }

    session.save(details);
  },

  restoreSession: function(){
    if(session.exists()) {
      var details = session.retrieve();
      this.username = details.username;
      this.room = details.room;
      this.connection.attach(this.jid(), details.sid, details.rid, this.onServerConnect.bind(this));
    }
  },

  disconnect: function() {
    this.connection.muc.leave(this.roomAndServer(), 
                              this.username, 
                              function() { this.connection.disconnect(); session.clear(); }.bind(this)
                             );
  },

  log: function() {
    console.log('IN CB', arguments);
    return true;
  },

  onMessage: function(message, room) {
    console.log("IN comms::onMessage - this.onMesage");
    var msg = Object.create(Message);
    msg.init(message);

    this.onMessageCb({ body: msg.body(), sender: msg.sender() });

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
      session.clear();
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
      return this.chatServer;
    } else {
      return this.username+'@'+this.chatServer;
    }
  },

  roomAndServer: function() {
    return this.room+'@'+this.conferenceServer;
  },

  isConnected: function() {
    return (this.currentStatus == Strophe.Status.CONNECTED || this.currentStatus == Strophe.Status.ATTACHED);
  },

  groupchat: function(message) {
    this.connection.muc.groupchat(this.roomAndServer(), message);
  },

};
