describe("XmppComms", function() {

  describe('#connect', function() {

    it("sets the username, password, rooom", function() {
      var comms1 = Object.create(XmppComms);
      comms1.connect('fakeuser1', 'fakepass1', 'fakeroom1');
      expect(comms1.username).toBe('fakeuser1');
      expect(comms1.password).toBe('fakepass1');
      expect(comms1.room).toBe('fakeroom1');

      var comms2 = Object.create(XmppComms); 
      comms2.connect('fakeuser2', 'fakepass2', 'fakeroom2');
      expect(comms2.username).toBe('fakeuser2');
      expect(comms2.password).toBe('fakepass2');
      expect(comms2.room).toBe('fakeroom2');
    });

    it('calls Strophe correctly',function() {
      var comms = Object.create(XmppComms);
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.connection.boshService).toBe(comms.boshServiceUrl());
      expect(comms.connection.jid).toBe(comms.jid());
      expect(comms.connection.password).toBe(comms.password);
      expect(comms.connection.onConnectCb).toBe(comms.onConnect);
    })

  });

  describe('#roomAndServer', function() {
    it('combines generates the room JID',function() {
      var comms = Object.create(XmppComms);
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.roomAndServer()).toBe('fakeroom@'+XmppComms.CONFERENCE_SERVER);
    })
  });

  describe('currentStatus', function() {
    it('is null by default',function() {
      var comms = Object.create(XmppComms);
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.currentStatus).toBe(null);
    })
  });

  describe('#isConnected', function(){
    describe('when currentStatus is CONNECTED', function() {
      it('returns true', function() {
        var comms = Object.create(XmppComms);
        comms.connect('fakeuser', 'fakepass', 'fakeroom');
        comms.onConnect(Strophe.Status.CONNECTED);
        expect(comms.isConnected()).toBe(true);
      });
    });

    describe('for all other states', function() {
      it('returns false', function() {
        var comms = Object.create(XmppComms);
        comms.connect('fakeuser', 'fakepass', 'fakeroom');
        expect(comms.isConnected()).toBe(false);
        comms.onConnect(Strophe.Status.CONNECTING);
        expect(comms.isConnected()).toBe(false);
        comms.onConnect(Strophe.Status.DISCONNECTED);
        expect(comms.isConnected()).toBe(false);
      });
    });
  });

  describe('#onConnect', function() {
    var comms;

    beforeEach(function(){
      comms = Object.create(XmppComms);
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
    });

    it('sets the currentStatus',function() {
      comms.onConnect(Strophe.Status.CONNECTING);
      expect(comms.currentStatus).toBe(Strophe.Status.CONNECTING);
      comms.onConnect(Strophe.Status.DISCONNECTED);
      expect(comms.currentStatus).toBe(Strophe.Status.DISCONNECTED);
    })

    describe('when status is CONNECTED',function() {
      it('joins the specified room', function() {
        mucSpy = spyOn(comms.connection.muc,'join');
        comms.onConnect(Strophe.Status.CONNECTED);
        expect(mucSpy).toHaveBeenCalledWith(comms.roomAndServer(),
                                            comms.username,
                                            comms.onMessage,
                                            console.log,
                                            console.log
                                           );
      });
    });
  });
});
