var React  = require('react/addons');
var LoginForm = require('../../../app/components/login_form.jsx');

var instance;
var TestUtils = React.addons.TestUtils;

describe("LoginForm", function() {

  describe("render", function() {
    describe('on submit', function(){
      var fakeLoggedInAs;

      beforeEach(function() {
        fakeLoggedInAs = jasmine.createSpy('fakeLoggedInAs');
        instance = TestUtils.renderIntoDocument(
          <LoginForm loggedInAs={fakeLoggedInAs} username="test" room="testroom"  />)
      });

      it('passes the username, room to loggedInAs', function() {

        instance.refs.room.getDOMNode().value = "Fake Room";
        instance.refs.username.getDOMNode().value = "Fake Username";
        TestUtils.Simulate.submit(instance.getDOMNode());
        expect(fakeLoggedInAs).toHaveBeenCalledWith("Fake Username", "Fake Room");
      });

      it("have name attribute in field, to make acceptance easier", function() {
        expect(instance.refs.room.getDOMNode().name).toEqual('room');
        expect(instance.refs.username.getDOMNode().name).toEqual('username');
      });
    });
  });
});

