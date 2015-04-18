var proxyquire = require('proxyquireify')(require);

var fakeCookies = {
  store: {},
  setItem: function(k,v) { this.store[k] = v; },
  getItem: function(k) { return this.store[k]; },
  hasItem: function(k) { return this.store[k] !== undefined; },
  removeItem: function(k) { delete this.store[k] }
};

var Strophe = require('./support/mock_strophe.js');

var stubs = {
  './deps/strophe.js': Strophe,
  './deps/strophe.muc.js': {},
  './utils/cookies.js': fakeCookies,
};

var Comms = proxyquire('../../app/comms.js', stubs);

describe("Comms", function() {

  var comms;

  beforeEach(function() {
    comms = Object.create(Comms);
    fakeCookies.store = {};
  });

  describe('#init', function() {

    it('sets the boshServiceUrl and conferenceServer', function() {
      comms.init('http://fakeBoshUrl','fake.server','conf.fake.server');
      expect(comms.boshServiceUrl).toEqual('http://fakeBoshUrl');
      expect(comms.boshServiceUrl).toEqual('http://fakeBoshUrl');
      expect(comms.chatServer).toEqual('fake.server');
      expect(comms.conferenceServer).toEqual('conf.fake.server');
    });

    it('tries to restore existing sessions', function() {
      spyOn(comms,'restoreSession')
      comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
      expect(comms.restoreSession).toHaveBeenCalled();
    })

    describe('when the connection does not exist',function() {
      it('initializes it', function() {
        expect(comms.connection).toBeNull();
        comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
        expect(comms.connection.connect).toBeDefined();
      });

      it('sets boshservice', function() {
        comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
        expect(comms.connection.boshService).toBe(comms.boshServiceUrl);
      });

    });

    describe('when the connection exists',function() {
      it('resets it', function() {
        var fakeConnectionSpy = jasmine.createSpyObj('fake_connection', ['attach','reset']);
        comms.connection = fakeConnectionSpy;
        comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
        expect(fakeConnectionSpy.reset).toHaveBeenCalled();
      });
    });
  });

  describe('#setConfig', function() {
    it('assigns boshServiceUrl and conferenceServer', function() {
      comms.setConfig('http://example.com', 'example.com' ,'conference.example.com');
      expect(comms.boshServiceUrl).toEqual('http://example.com');
      expect(comms.conferenceServer).toEqual('conference.example.com');
    })

    describe('when either parameter is not set', function() {
      it('throws an exception', function() {
        expect(function() { comms.setConfig('blah')       }).toThrowError(TypeError);
        expect(function() { comms.setConfig('', 'blah')   }).toThrowError(TypeError);
        expect(function() { comms.setConfig('blah', null) }).toThrowError(TypeError);
      });
    });
  });

  describe('#registerCallbacks', function() {

    it('sets the onConnected, onDisconnected and onMessage callbacks', function() {
      var onConnectedSpy = jasmine.createSpy('onConnectedSpy');
      var onDisconnectedSpy = jasmine.createSpy('onDisconnectedSpy');
      var onMessageSpy = jasmine.createSpy('onMessageSpy');

      comms.registerCallbacks(onConnectedSpy, onDisconnectedSpy, onMessageSpy);
      expect(comms.onConnectedCb).toBe(onConnectedSpy);
      expect(comms.onDisconnectedCb).toBe(onDisconnectedSpy);
      expect(comms.onMessageCb).toBe(onMessageSpy);
    });
  });

  describe('#connect', function() {
    beforeEach(function() {
      comms.init('http://fakebosh', 'fake.server', 'fake.conference.server');
    });

    it("sets the username, password, rooom", function() {
      comms.connect('fakeuser1', 'fakepass1', 'fakeroom1');
      expect(comms.username).toBe('fakeuser1');
      expect(comms.password).toBe('fakepass1');
      expect(comms.room).toBe('fakeroom1');
    });


    describe('establishes a connection', function(){
      it('sets jid and password on the connection object', function() {
        comms.connect('fakeuser', 'fakepass', 'fakeroom');
        expect(comms.connection.jid).toBe(comms.jid());
        expect(comms.connection.password).toBe(comms.password);
      });

      it('sets the onServerConnect callback on the connection object',function() {
        spyOn(comms, 'onServerConnect');
        comms.connect('fakeuser', 'fakepass', 'fakeroom');
        //we call comms.connection.onConnectCb and check if the callback, onServerConnect was called
        //we cannot check the function directly because it was wrapped in a `bind` call
        comms.connection.onConnectCb();
        expect(comms.onServerConnect).toHaveBeenCalled();
      })
    });
  });


  describe('#saveSession', function() {
    it('stores the jid, sid, rid, username, room into cookie', function() {
      comms.init('http://fakebosh', 'fake.server', 'fake.conference.server');

      cookieSpy = spyOn(fakeCookies,'setItem');
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      comms.saveSession();
      //the rid, sid values are hardcoded in mock-strophe
      expect(cookieSpy.calls.allArgs()).toEqual(
        [
          ['chatyuk_user', 'fakeuser'],
          ['chatyuk_room', 'fakeroom'],
          ['chatyuk_sid', 'fakesid-123123'],
          ['chatyuk_rid', 999]
        ]);
    });

  });

  describe('#restoreSession', function() {
    describe('when there was no prior session', function() {
      it('does not try to attach', function() {
        var fakeConnectionSpy = jasmine.createSpyObj('fake_connection', ['attach','reset']);
        comms.connection = fakeConnectionSpy;
        spyOn(comms,'hasPriorSession').and.returnValue(false);
        comms.init('http://fakebosh','fake.server','fake.conference.server');
        expect(fakeConnectionSpy.attach).not.toHaveBeenCalled();
      });
    });

    describe('when there was a prior session', function() {
      var chatyuk_user = 'fakeuser';
      var chatyuk_room = 'fakeroom';
      var chatyuk_sid = 's123';
      var chatyuk_rid = 123;

      beforeEach(function() {
        fakeCookies.setItem('chatyuk_user', chatyuk_user);
        fakeCookies.setItem('chatyuk_room', chatyuk_room);
        fakeCookies.setItem('chatyuk_sid', chatyuk_sid);
        fakeCookies.setItem('chatyuk_rid', chatyuk_rid);
      });

      it('sets username, room based on the values from the saved session', function() {
      comms.init('http://fakebosh','fake.server','fake.conference.server');

        expect(comms.username).toEqual('fakeuser');
        expect(comms.room).toEqual('fakeroom');
      });

      it('calls connection attach with the right values', function(){
        var fakeConnectionSpy = jasmine.createSpyObj('fake_connection', ['attach','reset']);
        comms.connection = fakeConnectionSpy;
        comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');

        expect(comms.connection.attach).toHaveBeenCalledWith(comms.jid(), chatyuk_sid, chatyuk_rid, jasmine.any(Function));
      });
    });
  });

  describe('#onMessage', function() {
    var onMessageCb;

    var message = null;
    var body = "Don't Tell 'Em";
    var sender = 'sillylogger';

    beforeEach(function() {
      onMessageCb = jasmine.createSpy('onMessageCb');
      comms.init('http://fakebosh', 'fake.server', 'fake.conference.server');
      comms.setOnMessageCb(onMessageCb);
    });

    it('parses the message and passes that to the onMessageCb', function() {
      var data = `<message  xmlns="jabber:client"
                            type="groupchat"
                            to="aaf868ec-d5d1-43e9-ab9a-20662abd8d52@chatyuk.com/84e99860-e518-4f63-be89-4c9a11c2bdaa"
                            from="vip@conference.chatyuk.com/${sender}"
                            id="1">
                    <body>${body}</body>
                    <x xmlns="jabber:x:event">
                      <composing/>
                    </x>
                  </message>`;

      message = new DOMParser().parseFromString(data, "text/xml").documentElement;

      comms.onMessage(message);
      expect(onMessageCb).toHaveBeenCalled();

      var args = onMessageCb.calls.mostRecent().args[0];
      expect(args.body).toEqual(body);
      expect(args.sender).toEqual(sender);
    });

  });

  describe('#jid', function() {
    beforeEach(function() {
      comms.init('http://fakebosh', 'fake.server', 'fake.conference.server');
    });

    it('combines the username with the chatserver to create the user JID',function() {
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.jid()).toBe('fakeuser@fake.server');
    });

    describe('when we login anonymously', function() {
      it('returns the chatserver as the jid', function() {
        comms.connect('fakeuser', '', 'fakeroom');
        expect(comms.jid()).toBe('fake.server');
      });
    });
  });

  describe('#roomAndServer', function() {
    it('combines generates the room JID',function() {
      var comms = Object.create(Comms);
      comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.roomAndServer()).toBe('fakeroom@conf.fake.server');
    })
  });

  describe('currentStatus', function() {
    it('is null by default',function() {
      var comms = Object.create(Comms);
      comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.currentStatus).toBe(null);
    })
  });

  describe('#isConnected', function(){
    beforeEach(function() {
      comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
    });
    describe('when currentStatus is CONNECTED', function() {
      it('returns true', function() {
        comms.onServerConnect(Strophe.Status.CONNECTED);
        expect(comms.isConnected()).toBe(true);
      });
    });

    describe('when currentStatus is ATTACHED', function() {
      it('returns true', function() {
        comms.onServerConnect(Strophe.Status.ATTACHED);
        expect(comms.isConnected()).toBe(true);
      });
    });

    describe('for all other states', function() {
      it('returns false', function() {
        expect(comms.isConnected()).toBe(false);
        comms.onServerConnect(Strophe.Status.CONNECTING);
        expect(comms.isConnected()).toBe(false);
        comms.onServerConnect(Strophe.Status.DISCONNECTED);
        expect(comms.isConnected()).toBe(false);
      });
    });
  });

  describe('#onServerConnect', function() {

    beforeEach(function(){
      comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
    });

    it('sets the currentStatus',function() {
      comms.onServerConnect(Strophe.Status.CONNECTING);
      expect(comms.currentStatus).toBe(Strophe.Status.CONNECTING);
      comms.onServerConnect(Strophe.Status.DISCONNECTED);
      expect(comms.currentStatus).toBe(Strophe.Status.DISCONNECTED);
    })

    describe('when status is CONNECTED',function() {
      it('joins the specified room', function() {
        mucSpy = spyOn(comms.connection.muc,'join');
        comms.onServerConnect(Strophe.Status.CONNECTED);
        expect(mucSpy).toHaveBeenCalledWith(comms.roomAndServer(),
                                            comms.username,
                                            //need to do this because onMessage is having bind(this) called on it and it writtens a wrapped function - need to figureout a better way to test these type of cases
                                            jasmine.any(Function),
                                            comms.log,
                                            comms.log
                                           );
      });
    });

    describe('when status is CONFAIL', function(){
      it('destroys reference to prior session', function(){
        clearSessionSpy = spyOn(comms, 'clearSession');
        comms.onServerConnect(Strophe.Status.CONNFAIL);
        expect(clearSessionSpy).toHaveBeenCalled();
      });
    });
  });

  describe('#clearSession', function(){
    var chatyuk_user = 'fakeuser';
    var chatyuk_room = 'fakeroom';
    var chatyuk_sid = 's123';
    var chatyuk_rid = 123;

    beforeEach(function() {
      fakeCookies.setItem('chatyuk_user', chatyuk_user);
      fakeCookies.setItem('chatyuk_room', chatyuk_room);
      fakeCookies.setItem('chatyuk_sid', chatyuk_sid);
      fakeCookies.setItem('chatyuk_rid', chatyuk_rid);
    });

    it("remove prior session reference", function(){
      comms.init('http://fakeBoshUrl', 'fake.server', 'conf.fake.server');
       expect(fakeCookies.getItem('chatyuk_user')).not.toBeUndefined();
       comms.clearSession();
       expect(fakeCookies.getItem('chatyuk_user')).toBeUndefined();
       expect(fakeCookies.getItem('chatyuk_room')).toBeUndefined();
       expect(fakeCookies.getItem('chatyuk_sid')).toBeUndefined();
       expect(fakeCookies.getItem('chatyuk_rid')).toBeUndefined();
     });
  });
});
