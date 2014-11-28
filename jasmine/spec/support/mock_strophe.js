Strophe = { boshService: null };

Strophe.Status = {
  CONNECTING: 0, 
  CONNFAIL: 1,
  DISCONNECTING: 2,
  DISCONNECTED: 3,
  CONNECTED: 4
}

Strophe.Connection = function( boshService ) { this.boshService = boshService};
Strophe.Connection.prototype = {
  connect: function (jid, password, onConnectCb) { 
             this.jid = jid;
             this.password = password;
             this.onConnectCb = onConnectCb;
             return true
           },
}
