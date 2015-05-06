var proxyquire = require('proxyquireify')(require);

var fakeCookies = {
  store: {},
  set: function(k,v) { this.store[k] = v; },
  get: function(k) { return this.store[k]; },
  expire: function(k) { delete this.store[k] }
};

var stubs = {
  'cookies-js': fakeCookies,
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

      cookieSpy = spyOn(fakeCookies,'set');
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
      fakeCookies.set('chatyuk_user', fakeSession.username),
      fakeCookies.set('chatyuk_room', fakeSession.room),
      fakeCookies.set('chatyuk_sid',  fakeSession.sid),
      fakeCookies.set('chatyuk_rid',  fakeSession.rid)
    });

    it("remove prior session reference", function(){
       var session = sessionManager.retrieve();
       expect(session.username).toBeDefined();
       sessionManager.clear();
       expect(sessionManager.retrieve()).toBeDefined();
       expect(fakeCookies.get('chatyuk_user')).toBeUndefined();
       expect(fakeCookies.get('chatyuk_room')).toBeUndefined();
       expect(fakeCookies.get('chatyuk_sid')).toBeUndefined();
       expect(fakeCookies.get('chatyuk_rid')).toBeUndefined();
     });
  });

 });
