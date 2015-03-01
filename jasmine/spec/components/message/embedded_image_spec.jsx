var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;
var EmbeddedImage = require('../../../../app/components/message/embedded_image.jsx');

describe("EmbeddedImage", function() {

  describe('render', function() {

    it('renders the image that is set in the src property', function() {
      var embeddedImage = <EmbeddedImage src="http://fake.com/fake.png" />;
      instance = TestUtils.renderIntoDocument(embeddedImage);
      expect(instance.getDOMNode().getAttribute('src')).toEqual('http://fake.com/fake.png');
    });

  });
});

