var React  = require('react/addons');
var LoggedInBox = require('../../../app/components/logged_in_box.jsx');

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
