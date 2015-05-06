var docCookies = require('cookies-js');


module.exports = {

  save: function(session) {
    docCookies.set('chatyuk_user', session.username);
    docCookies.set('chatyuk_room', session.room);
    docCookies.set('chatyuk_sid', session.sid);
    docCookies.set('chatyuk_rid', session.rid);
  },

  exists: function(){
    return (docCookies.get('chatyuk_sid') && 
      docCookies.get('chatyuk_rid') && 
      docCookies.get('chatyuk_user') && 
      docCookies.get('chatyuk_room'));
  },

  clear: function(){
    docCookies.expire('chatyuk_sid'); 
    docCookies.expire('chatyuk_rid'); 
    docCookies.expire('chatyuk_user'); 
    docCookies.expire('chatyuk_room'); 
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
