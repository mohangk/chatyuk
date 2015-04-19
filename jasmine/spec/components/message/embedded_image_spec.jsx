var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ImageUtil = require('../../../../app/utils/image.js');
var EmbeddedImage = require('../../../../app/components/message/embedded_image.jsx');

describe("EmbeddedImage", function() {

  var src = "data:image/gif;base64,R0lGODdhCgAFAMIAAMzMzJaWlrGxsaqqqre3t6Ojo8XFxQAAACwAAAAACgAFAAADEAi63C6DNFlAhQJQC0xQRgIAOw=="

  describe('render', function() {

    it('renders the image that is set in the src property', function() {
      var embeddedImage = <EmbeddedImage src={src} />;
      instance = TestUtils.renderIntoDocument(embeddedImage);
      expect(instance.getDOMNode().getAttribute('src')).toEqual(src);
    });

    context("when the image is landscape (width > height)", function() {
      beforeEach(function() {
        spyOn(ImageUtil, 'getDimensions').and.returnValue({ width: 200, height: 200 });
      });

      it('sets the width to be 100%', function() {
        var embeddedImage = <EmbeddedImage src={src} />;
        instance = TestUtils.renderIntoDocument(embeddedImage);
        expect(instance.getDOMNode().getAttribute('style')).toEqual('width:100%;');
      });
    });

    context("when the image is portrait (narrow, ramping)", function() {

      it("will set the height to a max of 150", function() {
        spyOn(ImageUtil, 'getDimensions').and.returnValue({ width: 5, height: 200 });

        var embeddedImage = <EmbeddedImage src={src} />;
        instance = TestUtils.renderIntoDocument(embeddedImage);
        expect(instance.getDOMNode().getAttribute('style')).toEqual('height:150px;');
      });

      it("will not enlarge small images", function() {
        spyOn(ImageUtil, 'getDimensions').and.returnValue({ width: 5, height: 75 });

        var embeddedImage = <EmbeddedImage src={src} />;
        instance = TestUtils.renderIntoDocument(embeddedImage);
        expect(instance.getDOMNode().getAttribute('style')).toEqual('height:75px;');
      });

    });
  });

});

