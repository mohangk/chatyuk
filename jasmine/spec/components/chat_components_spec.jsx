var React  = require('react/addons');
var Message = require('../../../app/components/message.jsx');
var Emoticon = require('../../../app/components/emoticon.jsx');
var LoggedInBox = require('../../../app/components/logged_in_box.jsx');
var LoginForm = require('../../../app/components/login_form.jsx');

describe("UI Components", function() {
  var instance;
  var TestUtils = React.addons.TestUtils;

  describe("LoggedInBox", function() {

    describe('render', function() {

      it('displays the logout button that is bound to props.logout', function() {

        logoutSpy = jasmine.createSpy('fakeLogout');

        instance = TestUtils.renderIntoDocument(<LoggedInBox username="fake_username" room="fake_room" logout={logoutSpy} />);
        var loggedInButton = TestUtils.findRenderedDOMComponentWithTag(instance, "input");
        TestUtils.Simulate.click(loggedInButton.getDOMNode());
        expect(logoutSpy).toHaveBeenCalled();

      });

      it('displays the username and room', function() {

        instance = TestUtils.renderIntoDocument(<LoggedInBox username="fake_username" room="fake_room" />)
        var loggedInSpan = TestUtils.findRenderedDOMComponentWithTag(instance, "span");
        expect(loggedInSpan.getDOMNode().textContent.trim()).toEqual('Logged in as fake_username in fake_room')

      });
    });

  });

  describe("LoginForm", function() {

    describe("render", function() {
      describe('on submit', function(){

        it('passes the username, room to loggedInAs', function() {
          var fakeLoggedInAs = jasmine.createSpy('fakeLoggedInAs');

          instance = TestUtils.renderIntoDocument(<LoginForm loggedInAs={fakeLoggedInAs} username="test" room="testroom"  />)
          instance.refs.room.getDOMNode().value = "Fake Room";
          instance.refs.username.getDOMNode().value = "Fake Username";
          TestUtils.Simulate.submit(instance.getDOMNode());
          expect(fakeLoggedInAs).toHaveBeenCalledWith("Fake Username", "Fake Room");
        });
      });
    });
  });


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
});
