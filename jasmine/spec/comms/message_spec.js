var Message = require('app/comms/message.js');
describe('comms.Message', function() {

  var message = null;
  var body = "Don't Tell 'Em";
  var sender = 'sillylogger';

  it('parses the body and the sender', function() {
    var msg = Object.create(Message);
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

    var messageDOM = new DOMParser().parseFromString(data, "text/xml").documentElement;
    msg.init(messageDOM)

    expect(msg.body()).toEqual(body);
    expect(msg.sender()).toEqual(sender);
  });

  // describe('#isValid', function() {
  //   describe('when the message has a body', function() {
  //     it('returns true', function() {
  //       
  //       
  //     });
  //   });
  //
  //   describe('when the message has no body', function() {
  //     it('returns false', function() {
  //
  //     });
  //   });
  //         
  //         
  // });
});
