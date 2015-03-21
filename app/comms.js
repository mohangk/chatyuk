"use strict";

var Strophe = require('./deps/strophe.js');
              require('./deps/strophe.muc.js');
var $ =       require('./deps/jquery.min.js');

module.exports =  {

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
    // if(typeof(onConnectedCb) != 'undefined') {
      this.onConnectedCb = onConnectedCb;
    //}

    // if(typeof(onDisconnectedCb) != 'undefined') {
      this.onDisconnectedCb = onDisconnectedCb;
    //}

    if(onMessageCb !== null || typeof(onMessageCb) != 'undefined') {
      this.onMessageCb = onMessageCb;
    }

    this.connection.connect(this.jid(),
                       this.password,
                       this.onServerConnect.bind(this));
  },

  setOnMessageCb: function(onMessageCb) {
    this.onMessageCb = onMessageCb;
  },

  disconnect: function() {
    this.connection.muc.leave(this.roomAndServer(), this.username, function() { this.connection.disconnect(); }.bind(this));
  },

  log: function() {
    console.log('IN CB', arguments);
    return true;
  },

  onMessage: function(message, room) {

    console.log(">> IN comms::onMessage -this.onMesage");
    var $message = $(message),
        body = $message.children('body').text(),
        jid = $message.attr('from'),
        resource = Strophe.getResourceFromJid(jid),
        sender = resource && Strophe.unescapeNode(resource) || '',
        delayed = $message.find('delay').length > 0,
        subject = $message.children('subject').text();
    console.log(">> IN comms::onMessage calling this.onMessageCb", this.onMessageCb);
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
      if(typeof(this.onDisconnectedCb) != 'undefined') {
        this.onDisconnectedCb();
      }
    } 
    else if (status == Strophe.Status.DISCONNECTING) {
      console.log('Strophe is disconnecting.');
    } 
    else if (status == Strophe.Status.DISCONNECTED) {
      console.log('Strophe is disconnected.');
      if(typeof(this.onDisconnectedCb) != 'undefined') {
        this.onDisconnectedCb();
      }
    } 
    else if (status == Strophe.Status.CONNECTED) {
      console.log('Strophe is connected.');
      if(typeof(this.onConnectedCb) != 'undefined') {
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
    return (this.currentStatus == Strophe.Status.CONNECTED);
  },

  groupchat: function(message) {
    this.connection.muc.groupchat(this.roomAndServer(), message);
  }

};
