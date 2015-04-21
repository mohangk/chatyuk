var proxyquire = require('proxyquireify')(require);

var fakeCookies = {
  store: {},
  setItem: function(k,v) { this.store[k] = v; },
  getItem: function(k) { return this.store[k]; },
  hasItem: function(k) { return this.store[k] !== undefined; },
  removeItem: function(k) { delete this.store[k] }
};

var stubs = {
  '../utils/cookies.js': fakeCookies,
};

var fakeSession = {
  username : 'fakeuser',
  room : 'fakeroom',
  sid : 's123',
  rid : 123
};
var sessionManager = proxyquire('../../../app/comms/session_manager.js', stubs);

describe('SessionManager', function() {
  beforeEach(function() {
    fakeCookies.store = {};
  });
 
  describe('#save', function() {
    it('stores the jid, sid, rid, username, room into cookie', function() {

      cookieSpy = spyOn(fakeCookies,'setItem');
      sessionManager.save(fakeSession);

      expect(cookieSpy.calls.allArgs()).toEqual(
        [
          ['chatyuk_user', fakeSession.username],
          ['chatyuk_room', fakeSession.room],
          ['chatyuk_sid',  fakeSession.sid],
          ['chatyuk_rid',  fakeSession.rid]
        ]);
    });
  });

  describe('#clear', function(){
   
    beforeEach(function() {
      fakeCookies.setItem('chatyuk_user', fakeSession.username),
      fakeCookies.setItem('chatyuk_room', fakeSession.room),
      fakeCookies.setItem('chatyuk_sid',  fakeSession.sid),
      fakeCookies.setItem('chatyuk_rid',  fakeSession.rid)
    });

    it("remove prior session reference", function(){
       var session = sessionManager.retrieve();
       expect(session.username).toBeDefined();
       sessionManager.clear();
       expect(sessionManager.retrieve()).toBeDefined();
       expect(fakeCookies.getItem('chatyuk_user')).toBeUndefined();
       expect(fakeCookies.getItem('chatyuk_room')).toBeUndefined();
       expect(fakeCookies.getItem('chatyuk_sid')).toBeUndefined();
       expect(fakeCookies.getItem('chatyuk_rid')).toBeUndefined();
     });
  });

 });
