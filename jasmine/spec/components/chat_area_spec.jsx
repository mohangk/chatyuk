var React  = require('react/addons');
var ChatArea = require('../../../app/components/chat_area.jsx');
var OnPageChatBox = require('../../../app/components/on_page_chat_box.jsx');
var InPageChatBox = require('../../../app/components/in_page_chat_box.jsx');

var instance;
var TestUtils = React.addons.TestUtils;

var commsStub = {isConnected: function() {false} };
describe("ChatArea", function() {
  describe('componentDidMount', function() {

    it('registers this.updateState as onConnected and onDisconnected callbacks ', function() {
      //var updateStateSpy = jasmineReact.spyOnClass(ChatArea,'updateState');
      var registerCallbacksSpy = spyOn(commsStub, 'registerCallbacks');
      instance = TestUtils.renderIntoDocument(<ChatArea comms={commsStub} config={{}} />);
      expect(registerCallbacksSpy).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    });
  });

  describe('chatBoxClass', function(){
    describe('when config.display_mode is set to "inpage"', function(){
      it('returns InPageChatBox', function() {
        var config = { display_mode: 'inpage'};
        instance = TestUtils.renderIntoDocument(<ChatArea comms={commsStub} config={config} />);
        expect(instance.chatBoxClass()).toEqual(InPageChatBox);
      });
    });

    describe('when config.display_mode is set to "onpage"', function(){
      it('renders the onpage version of the ChatArea', function() {
        var config = { display_mode: 'onpage'};
        instance = TestUtils.renderIntoDocument(<ChatArea comms={commsStub} config={config} />);
        expect(instance.chatBoxClass()).toEqual(OnPageChatBox);
      });
    });
  });

  describe('render',function() {
    it('renders the type returned chatBoxClass', function() {
      var chatBoxClassSpy = jasmineReact.spyOnClass(ChatArea,'chatBoxClass').and.returnValue(OnPageChatBox);

      instance = TestUtils.renderIntoDocument(<ChatArea comms={commsStub} />);
      expect(TestUtils.findRenderedComponentWithType(instance, OnPageChatBox)).toBeDefined();
      
      chatBoxClassSpy.and.returnValue(InPageChatBox);

      instance = TestUtils.renderIntoDocument(<ChatArea comms={commsStub} />);
      expect(TestUtils.findRenderedComponentWithType(instance, InPageChatBox)).toBeDefined();
    });
  });

});
