var React  = require('react/addons');
var ChatBoxHead = require('../../../app/components/chat_box_head.jsx');

var instance;
var TestUtils = React.addons.TestUtils;

describe("ChatBoxHead", function() {
  describe('minimizeButton', function() {
    describe('when onMinimize prop is set', function() {
      it('adds the close link that is attached to onMinimize', function() {
        var minimizeEventHandlerSpy = jasmine.createSpy('minimizeEventHandler');
        instance = TestUtils.renderIntoDocument(<ChatBoxHead onMinimize={minimizeEventHandlerSpy} />);
        var minimizeButton = instance.refs.minimizeButton.getDOMNode();
        expect(minimizeButton.tagName).toEqual('A');
        React.addons.TestUtils.Simulate.click(minimizeButton);
        expect(minimizeEventHandlerSpy).toHaveBeenCalled();
      });
    });

    describe('when onMinimize prop is not set', function(){

      it('does not add the minimizeButton', function() {
        instance = TestUtils.renderIntoDocument(<ChatBoxHead />);
        expect(instance.refs.minimizeButton).toBeUndefined();
      });

    });


  });

  describe('render', function(){

    it('renders a minimizeButton', function() {
      var minimizeButtonSpy = jasmineReact.spyOnClass(ChatBoxHead, "minimizeButton").and.returnValue(<div/>);
      instance = TestUtils.renderIntoDocument(<ChatBoxHead />);
      expect(minimizeButtonSpy).toHaveBeenCalled();
    });

    it('renders a chat-head element', function() {
      instance = TestUtils.renderIntoDocument(<ChatBoxHead />);
      expect(instance.getDOMNode().tagName).toEqual('DIV');
      expect(instance.getDOMNode().getAttribute('class')).toEqual('chat-head chat-head-chatroom');
    });

  });

});
