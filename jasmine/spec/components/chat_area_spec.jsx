var React  = require('react/addons');
var ChatArea = require('../../../app/components/chat_area.jsx');
var OnPageChatBox = require('../../../app/components/on_page_chat_box.jsx');
var InPageChatBox = require('../../../app/components/in_page_chat_box.jsx');

var TestUtils = React.addons.TestUtils;

var instance;
var loggedInCommsStub = null; 
var loggedOutCommsStub = null; 

var triggerWindowUnload = function() {
  var event = new PageTransitionEvent('unload', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  window.dispatchEvent(event);
}

var createCommStub = function() {
  return jasmine.createSpyObj('commstub', ['isConnected', 'registerCallbacks', 'disconnect', 'saveSession']);
};

describe("ChatArea", function() {
  var renderSpy = null;

  
  beforeEach(function() {
    loggedOutCommsStub = createCommStub();
    loggedOutCommsStub.isConnected = function ()  { return false };

    loggedInCommsStub =  createCommStub();
    loggedInCommsStub.isConnected = function ()  { return true };
    loggedInCommsStub.username = 'test';
    loggedInCommsStub.password = 'test';

    renderSpy = jasmineReact.spyOnClass(ChatArea,'render').and.returnValue(<div/>);
  });

  describe('logout', function() {

    describe('when logged in', function() {
      it('calls comms.disconnect', function() {
        instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedInCommsStub} config={{}} />);
        instance.logout();
        expect(loggedInCommsStub.disconnect).toHaveBeenCalled();
      });
    });

    describe('when logged out', function() {
      it('does not call comms.disconnect', function() {
        
        var disconnectSpy = jasmine.createSpy('disconnect'); 
        instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedOutCommsStub} config={{}} />);
        instance.logout();
        expect(loggedOutCommsStub.disconnect).not.toHaveBeenCalled();
        
      });
    });

  });

  describe('unloading', function() {

    describe('when logged in', function() {
      it('calls comms.saveSession', function() {
        instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedInCommsStub} config={{}} />);
        instance.unloading();
        expect(loggedInCommsStub.saveSession).toHaveBeenCalled();
      });

    });

    describe('when logged out', function() {
      it('does not call comms.saveSession', function() {
        instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedOutCommsStub} config={{}} />);
        instance.unloading();
        expect(loggedOutCommsStub.saveSession).not.toHaveBeenCalled();
      });
    });

  });

  describe('componentWillUnmount', function() {
    it('unattaches the window.unload event', function() {
      var unloadingSpy = jasmineReact.spyOnClass(ChatArea,'unloading');
      instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedInCommsStub} config={{}} />);
      instance.unmountComponent();
      triggerWindowUnload();
      expect(unloadingSpy).not.toHaveBeenCalled();
    });
  });

  describe('componentDidMount', function() {
    it('attaches unloading to the window.unload event', function() {
      var unloadingSpy = jasmineReact.spyOnClass(ChatArea,'unloading');
      instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedInCommsStub} config={{}} />);
      triggerWindowUnload();
      expect(unloadingSpy).toHaveBeenCalled();
    });

    it('registers this.updateState as onConnected and onDisconnected callbacks ', function() {
      instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedInCommsStub} config={{}} />);
      expect(loggedInCommsStub.registerCallbacks).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    });
  });

  describe('chatBoxClass', function(){
    describe('when config.display_mode is set to "inpage"', function(){
      it('returns InPageChatBox', function() {
        var config = { display_mode: 'inpage'};
        instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedInCommsStub} config={config} />);
        expect(instance.chatBoxClass()).toEqual(InPageChatBox);
      });
    });

    describe('when config.display_mode is set to "onpage"', function(){
      it('renders the onpage version of the ChatArea', function() {
        var config = { display_mode: 'onpage'};
        instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedInCommsStub} config={config} />);
        expect(instance.chatBoxClass()).toEqual(OnPageChatBox);
      });
    });
  });

  describe('render',function() {
    it('renders the type returned chatBoxClass', function() {
      renderSpy.and.callThrough();

      var chatBoxClassSpy = jasmineReact.spyOnClass(ChatArea,'chatBoxClass').and.returnValue(OnPageChatBox);

      instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedOutCommsStub} />);
      expect(TestUtils.findRenderedComponentWithType(instance, OnPageChatBox)).toBeDefined();

      chatBoxClassSpy.and.returnValue(InPageChatBox);

      instance = TestUtils.renderIntoDocument(<ChatArea comms={loggedOutCommsStub} />);
      expect(TestUtils.findRenderedComponentWithType(instance, InPageChatBox)).toBeDefined();
    });

    describe('when logged in', function() {
      it('renders MessagePane, LoggedInBox, MessageBox - need to stub those components out first');
    });

    describe('when logged out', function() {
      it('renders ChatBox, LoginForm - need to stub those components out first');      
    });
  });

});
