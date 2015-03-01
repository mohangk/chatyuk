var React  = require('react/addons');
var Message = require('../../../app/components/message.jsx');
var Emoticon = require('../../../app/components/message/emoticon.jsx');

var instance;
var TestUtils = React.addons.TestUtils;

describe("Message", function() {
  describe('formatSender', function() {
    it('appends a ":" to the sender', function() {
      instance = TestUtils.renderIntoDocument(<Message sender="FakeSender" body="FakeBody"  />)
      expect(instance.formatSender('FakeSender')).toEqual("FakeSender:");
    });

  });

  describe('formatBody', function() {

    describe('when the string is empty or undefined', function() {
      it('returns an empty string', function() {
        instance = TestUtils.renderIntoDocument(<Message />)
        expect(instance.formatBody()).toEqual('');
      });
    });

    describe('when there is no formatting',function() {
      it('returns the original body in an array', function() {
        instance = TestUtils.renderIntoDocument(<Message sender="FakeSender" body="FakeBody"  />)
        expect(instance.formatBody('FakeBody')).toEqual(['FakeBody']);
      });
    });

    describe('when there is formatting', function() {
      it('replaces the formatting with the appropriate Emoticon elements', function() {
        instance = TestUtils.renderIntoDocument(<Message />)
        expect(instance.formatBody('Hi :) nice to see you again :( !')).toEqual(['Hi ',<Emoticon type="smiley"/>,' nice to see you again ',<Emoticon type="disappointed"/>,' !']);
      })
    });

  });

  describe("render", function() {
    it('calls formatSender and formatBody with the right params', function() {

      var formatSenderSpy = jasmineReact.spyOnClass(Message, "formatSender").and.returnValue('fakeSenderFormatted');
      var formatBodySpy = jasmineReact.spyOnClass(Message, "formatBody").and.returnValue('fakeBodyFormatted');

      instance = TestUtils.renderIntoDocument(<Message sender="FakeSender" body="FakeBody"  />)

      expect(instance.refs.sender.getDOMNode().textContent).toEqual("fakeSenderFormatted");
      expect(instance.refs.body.getDOMNode().textContent).toEqual("fakeBodyFormatted");

      expect(formatSenderSpy).toHaveBeenCalledWith("FakeSender");
      expect(formatBodySpy).toHaveBeenCalledWith("FakeBody");
    });
  });
});
