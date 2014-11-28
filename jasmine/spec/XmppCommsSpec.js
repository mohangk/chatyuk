describe("XmppComms", function() {

  beforeEach(function() {
  });

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

  describe('#roomDefinition', function() {
    it('combines generates the room JID',function() {
      var comms = Object.create(XmppComms);
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.roomAndServer()).toBe('fakeroom@'+XmppComms.CONFERENCE_SERVER);
    })
  });

  describe('#onConnect', function() {
    it('currentStatus is null by default',function() {
      var comms = Object.create(XmppComms);
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      expect(comms.currentStatus).toBe(null);
      // comms.onConnect(Strophe.Strophe.CONNECTED);
    })

    it('sets the currentStatus',function() {
      var comms = Object.create(XmppComms);
      comms.connect('fakeuser', 'fakepass', 'fakeroom');
      comms.onConnect(Strophe.Status.CONNECTING);
      expect(comms.currentStatus).toBe(Strophe.Status.CONNECTING);
    })
  });
});
