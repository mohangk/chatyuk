var React  = require('react/addons');
var LoginForm = require('../../../app/components/login_form.jsx');

var instance;
var TestUtils = React.addons.TestUtils;

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

