var React  = require('react/addons');
var InPageChatBox= require('../../../app/components/in_page_chat_box.jsx');

var instance;
var TestUtils = React.addons.TestUtils;

describe("InPageChatBox", function() {

  describe('render', function(){

    it('renders the root div', function() {
      instance = TestUtils.renderIntoDocument(<InPageChatBox />);
      expect(instance.getDOMNode().tagName).toEqual('DIV');
      expect(instance.getDOMNode().getAttribute('id')).toEqual('chatyuk');
    });

    it('contains the ChatBoxHead', function() {
      instance = TestUtils.renderIntoDocument(<InPageChatBox />);
      expect(instance.refs.chatBoxHead).toBeDefined();
    });

    it('renders passed in children', function() {
      instance = TestUtils.renderIntoDocument(<InPageChatBox><div className="test-children">This is a test child</div></InPageChatBox>);
      expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'test-children')).toBeDefined();
    });
  });

});
