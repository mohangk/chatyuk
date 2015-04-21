var docCookies = require('../utils/cookies.js');


module.exports = {

  save: function(session) {
    docCookies.setItem('chatyuk_user', session.username);
    docCookies.setItem('chatyuk_room', session.room);
    docCookies.setItem('chatyuk_sid', session.sid);
    docCookies.setItem('chatyuk_rid', session.rid);
  },

  exists: function(){
    return (docCookies.getItem('chatyuk_sid') && 
      docCookies.hasItem('chatyuk_rid') && 
      docCookies.hasItem('chatyuk_user') && 
      docCookies.hasItem('chatyuk_room'));
  },

  clear: function(){
    docCookies.removeItem('chatyuk_sid'); 
    docCookies.removeItem('chatyuk_rid'); 
    docCookies.removeItem('chatyuk_user'); 
    docCookies.removeItem('chatyuk_room'); 
  },

  retrieve: function() {
    return { 
      sid: docCookies.getItem('chatyuk_sid'),
      rid: parseInt(docCookies.getItem('chatyuk_rid')),
      username: docCookies.getItem('chatyuk_user'),
      room: docCookies.getItem('chatyuk_room')
    }
  }

}
