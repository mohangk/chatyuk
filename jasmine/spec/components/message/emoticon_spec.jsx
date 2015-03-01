var React  = require('react/addons');
var Emoticon = require('../../../../app/components/message/emoticon.jsx');

var TestUtils = React.addons.TestUtils;
var instance;

describe("Emoticon", function() {

  describe('backgroundImageStyle', function() {

    it('returns a style with the right backgroud image url for the emoticon type', function() {
      instance = TestUtils.renderIntoDocument(<Emoticon type="smiley" />);
      expect(instance.backgroundImageStyle()).toEqual({ backgroundImage: 'url("http://twemoji.maxcdn.com/svg/1f603.svg")'});
    });

  });

  describe('render', function() {

    it('renders the emoticon for the specifed type with the appropriate backgroundImage', function() {
      var emoticon = <Emoticon type="smiley" />;
      var bgstyleSpy = jasmineReact.spyOnClass(Emoticon, 'backgroundImageStyle').and.returnValue({backgroundImage: 'fake.png'});
      instance = TestUtils.renderIntoDocument(emoticon);
      expect(bgstyleSpy).toHaveBeenCalled();
      expect(instance.getDOMNode().getAttribute('style')).toEqual('background-image:fake.png;');
    });


  });
});
