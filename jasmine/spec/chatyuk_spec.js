var proxyquire = require('proxyquireify')(require);
var React = require('react');
var ChatArea = require('../../app/components/chat_area.jsx');

var FakeComms = jasmine.createSpyObj('fake_comms', ['init', 'isConnected', 'registerCallbacks', 'setServerConfig']);

var stubs = { 
  'react': React,
  './comms.js': FakeComms,'@noCallThru': true,
  './components/chat_area.jsx': ChatArea,
};

var Chatyuk = proxyquire('../../app/chatyuk.jsx', stubs);

describe('Chatyuk',function() {
  var testDiv = null;
  var chatyuk = null;
  var renderSpy = null;
  var createElementSpy = null;


  beforeEach(function() {
    chatyuk = Object.create(Chatyuk);
  });

  describe('defaultConfig', function() {
    it('defaults display_mode to onpage', function() {
      expect(chatyuk.defaultConfig.display_mode).toEqual('inpage');
    });

    it('has bosh_service_url, chat_server and conference_server', function() {
      expect(chatyuk.defaultConfig.bosh_service_url).toEqual('http://chatyuk.com:5280/http-bind');
      expect(chatyuk.defaultConfig.chat_server).toEqual('chatyuk.com');
      expect(chatyuk.defaultConfig.conference_server).toEqual('conference.chatyuk.com');
    });
  });

  describe('init', function() {

    var renderComponentSpy = null;
    var chatyuk = null;

    beforeEach(function() {
      chatyuk = Object.create(Chatyuk);
      renderComponentSpy = spyOn(chatyuk, 'renderComponent');
    });

    it('initializes the comms object', function() {
      var initParams = {bosh_service_url: 'fake', chat_server: 'fake_server', conference_server: 'fake_conf_server'};
      chatyuk.init('fakeParentEl', initParams);
      expect(FakeComms.init).toHaveBeenCalledWith(initParams.bosh_service_url, initParams.chat_server, initParams.conference_server);
    });

    it('calls initConfig with the passed in config', function() {
      var initConfigSpy = spyOn(chatyuk, 'initConfig').and.callThrough();
      var configSpy = jasmine.createSpy();
      chatyuk.init('fakeParentEl', configSpy);
      expect(initConfigSpy).toHaveBeenCalledWith(configSpy);
    });

    it('calls renderComponent with the passed in parentEl', function() {
      var parentElSpy = jasmine.createSpy();
      chatyuk.init(parentElSpy, 'fakeConfig');
      expect(renderComponentSpy).toHaveBeenCalledWith(parentElSpy);
    });
  });

  describe('initConfig', function() {

    it('initializes the config property with the default values', function() {
      chatyuk = Object.create(Chatyuk);
      chatyuk.initConfig(undefined);
      expect(chatyuk.config).toEqual(jasmine.objectContaining(chatyuk.defaultConfig));
    });

    it('allows for config values to be overridden', function() {
      chatyuk = Object.create(Chatyuk);
      chatyuk.initConfig({display_mode: 'onpage'});
      expect(chatyuk.config.display_mode).toEqual('onpage');
    });
  });

  describe('renderComponent',function() {

    beforeEach(function() {
      testDiv = document.createElement("div");
      testDiv.setAttribute('id', 'test');
    });

    it('attaches the ChatArea to the passed in element', function() {
      var renderSpy = jasmineReact.spyOnClass(ChatArea, "render").and.returnValue(<div/>);
      chatyuk.config ={ display_mode : 'inpage'}
      chatyuk.renderComponent(testDiv);
      expect(renderSpy).toHaveBeenCalled();
      expect(testDiv.children.length).toEqual(1);
    });

    it('initializes ChatArea with comms and config', function() {
    
      renderSpy = spyOn(React, 'render');
      createElementSpy = spyOn(React, 'createElement');
      chatyuk.config =  {display_mode: 'inpage'};

      chatyuk.renderComponent(testDiv);
    
      var actualProps = createElementSpy.calls.first().args[1];
      var expectedProps = {comms: FakeComms, config: {display_mode: 'inpage'}};
      
      expect(actualProps.config).toEqual(expectedProps.config);
      expect(actualProps.comms.__proto__).toEqual(expectedProps.comms);
    });
  });
});
