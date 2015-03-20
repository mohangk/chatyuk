var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;
var EmbeddedVidio = require('../../../../app/components/message/embedded_vidio.jsx');

describe("EmbeddedVidio", function() {

  describe('render', function() {

    it('renders the vidio that is set in the src property', function() {
      var embeddedVidio = <EmbeddedVidio src="http://www.vidio.com/watch/33775-ganteng-ganteng-serigala-ep-310" />;
      var instance = TestUtils.renderIntoDocument(embeddedVidio);
      expect(instance.getDOMNode().tagName).toEqual('IFRAME');
      expect(instance.getDOMNode().getAttribute('src')).toEqual('http://www.vidio.com/embed/33775-ganteng-ganteng-serigala-ep-310');
    });

    it('renders the vidio with 16:9 aspect ratio', function() {
      var embeddedVidio = <EmbeddedVidio src="http://www.vidio.com/watch/33775-ganteng-ganteng-serigala-ep-310" />;
      var instance = TestUtils.renderIntoDocument(embeddedVidio);
      var style = instance.getDOMNode().getAttribute('style');

      var width = /width:(\d+)/.exec(style)[1];
      var height = /height:(\d+)/.exec(style)[1];
      var expectedRatio = (16 / 9).toFixed(2);
      var actualRatio = (width / height).toFixed(2);

      expect(expectedRatio).toEqual(actualRatio);
    });
  });
});

