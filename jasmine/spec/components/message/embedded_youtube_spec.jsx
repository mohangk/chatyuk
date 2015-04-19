var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;
var EmbeddedYoutube = require('../../../../app/components/message/embedded_youtube.jsx');

describe("EmbeddedYoutube", function() {

  describe('render', function() {

    it('renders the embedded youtube', function() {
      var embeddedYoutube = <EmbeddedYoutube src="http://www.youtube.com/watch?v=bNT-CT25clM" />;
      instance = TestUtils.renderIntoDocument(embeddedYoutube);
      expect(instance.getDOMNode().nodeName).toEqual('IFRAME');
      expect(instance.getDOMNode().getAttribute('src')).toEqual('http://www.youtube.com/embed/bNT-CT25clM');
    });

  });

  describe('toEmbedUrl', function () {
    it('convert normal youtube url to embed url', function() {
      var embeddedYoutube = <EmbeddedYoutube src=""/>;
      instance = TestUtils.renderIntoDocument(embeddedYoutube);
      expect(instance.toEmbedUrl('http://www.youtube.com/watch?v=bNT-CT25clM'))
                        .toEqual('http://www.youtube.com/embed/bNT-CT25clM');
    });
  });
});

