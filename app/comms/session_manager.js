var docCookies = require('cookies-js');


module.exports = {

  save: function(session) {
    docCookies.set('chatyuk_user', session.username);
    docCookies.set('chatyuk_room', session.room);
    docCookies.set('chatyuk_sid', session.sid);
    docCookies.set('chatyuk_rid', session.rid);
  },

  exists: function(){
    return (this.isSet('chatyuk_sid') && 
      this.isSet('chatyuk_rid') && 
      this.isSet('chatyuk_user') && 
      this.isSet('chatyuk_room'));
  },

  clear: function(){
    docCookies.expire('chatyuk_sid'); 
    docCookies.expire('chatyuk_rid'); 
    docCookies.expire('chatyuk_user'); 
    docCookies.expire('chatyuk_room'); 
  },

  
  isSet: function(key) {
    val = docCookies.get(key);
    return (val !== null && typeof(val) != 'undefined');
  },

  retrieve: function() {
    return { 
      sid: docCookies.get('chatyuk_sid'),
      rid: parseInt(docCookies.get('chatyuk_rid')),
      username: docCookies.get('chatyuk_user'),
      room: docCookies.get('chatyuk_room')
    }
  }

}
