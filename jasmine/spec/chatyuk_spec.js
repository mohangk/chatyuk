var proxyquire = require('proxyquireify')(require);
var React = require('react');
var Comms = require('../../app/comms.js');
var ChatArea = require('../../app/components/chat_area.jsx');


var stubs = { 
  'react': React,
  './comms.js': Comms,
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
  });

  describe('init', function() {

    var renderComponentSpy = null;
    var initConfigSpy = null;
    var chatyuk = null;

    beforeEach(function() {
      chatyuk = Object.create(Chatyuk);
      renderComponentSpy = spyOn(chatyuk, 'renderComponent');
      initConfigSpy = spyOn(chatyuk, 'initConfig');
    });

    it('calls initConfig with the passed in config', function() {
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

    it('allows for config values to be overriddent', function() {
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
      var expectedProps = {comms: {}, config: {display_mode: 'inpage'}};
      
      expect(actualProps).toEqual(expectedProps);
    });
  });
});
