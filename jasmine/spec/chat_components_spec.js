describe("UI Components", function() {
  var instance;
  var TestUtils = React.addons.TestUtils;

  describe("LoggedInBox", function() {
    it('renders',function() {
      instance = TestUtils.renderIntoDocument(React.createElement(LoggedInBox, {username: "fake_username", room: "fake_room"}))
    });
  });


});
