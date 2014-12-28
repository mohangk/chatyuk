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

});
