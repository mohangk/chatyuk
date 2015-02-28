var StropheMuc = function() {
  this.room = null;
  this.nick = null;
  this.onMessageCb = null;
  this.onPresenceCb = null;
  this.onRosterCb = null;
};

StropheMuc.prototype = {

  join: function(room, nick, onMessageCb, onPresenceCb, onRosterCb) {
    this.room = room;
    this.nick = nick;
    this.onMessageCb = onMessageCb;
    this.onPresenceCb = onPresenceCb;
    this.onRosterCb = onRosterCb;
  }
}

var Strophe = { boshService: null };

Strophe.Status = {
  CONNECTING: 0, 
  CONNFAIL: 1,
  DISCONNECTING: 2,
  DISCONNECTED: 3,
  CONNECTED: 4
}

Strophe.Connection = function( boshService ) { 
  this.boshService = boshService;
  this.muc = new StropheMuc();
};

Strophe.Connection.prototype = {

  connect: function (jid, password, onConnectCb) { 
             this.jid = jid;
             this.password = password;
             this.onConnectCb = onConnectCb;
             return true
           },
}

module.exports = Strophe;
