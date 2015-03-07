var React  = require('react/addons');
var ChatArea = require('../../../app/components/chat_area.jsx');

var instance;
var TestUtils = React.addons.TestUtils;

describe("ChatArea", function() {
  describe('render', function(){ 
    var commsStub = null;

    beforeEach(function() {
      commsStub = {isConnected: function() {false} };
    });

    describe('when config.display_mode is set to "inpage"', function(){
      it('renders the inpage version of the ChatArea', function() {
        var renderInPageSpy = jasmineReact.spyOnClass(ChatArea, "renderInPage").and.returnValue(<div/>);
        var config = { display_mode: 'inpage'};
        instance = TestUtils.renderIntoDocument(<ChatArea comms={commsStub} config={config} />);
        expect(renderInPageSpy).toHaveBeenCalled();
      });
    });

    describe('when config.display_mode is set to "onpage"', function(){
      it('renders the onpage version of the ChatArea', function() {

        var renderOnPageSpy = jasmineReact.spyOnClass(ChatArea, "renderOnPage").and.returnValue(<div/>);
        var config = { display_mode: 'onpage'};
        instance = TestUtils.renderIntoDocument(<ChatArea comms={commsStub} config={config} />);
        expect(renderOnPageSpy).toHaveBeenCalled();
      });
    });
  });

});
