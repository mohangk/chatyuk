var React  = require('react/addons');

var Emoticon = require('../../../app/components/message/emoticon.jsx');
var Emotify = require('../../../app/message_formatters/emotify.jsx');

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

describe("Emotify", function() {
  var instance = Object.create(Emotify);

  describe("parse", function() {
    it('replaces the formatting with the appropriate Emoticon elements', function() {
      expect(instance.parse(['Hi :) nice to see you again :( !'])).toEqual(['Hi ',<Emoticon type="smiley"/>,' nice to see you again ',<Emoticon type="disappointed"/>,' !']);
    })
  });

  describe("tokenize", function() {
    describe('when there is no matching emoticon', function() {
      it('returns the text as a single element in an array', function() {
          expect(instance.tokenize(':(','disappointed','Hi :) nice to see you again!')).toEqual([ 'Hi :) nice to see you again!']);
      });
    });

    describe('when there is one or more of the same emoticon', function() {
      it('splits the string at the token and adds a emoticon element in its place', function() {
          expect(instance.tokenize(':)','smiley','Hi :) nice to see you again!')).toEqual(['Hi ',<Emoticon type="smiley"/>,' nice to see you again!']);
          expect(instance.tokenize(':)','smiley', 'Hi :) nice to :) see you again!')).toEqual(['Hi ',<Emoticon type="smiley"/>,' nice to ', <Emoticon type="smiley"/>,' see you again!']);
      });
    });
  });

  describe('tokenizeTextArray', function() {
    it('passes each element in textArray that is a string to tokenize', function() {

      var originalTextArray = ['Hi :) nice to :) see you again!'];
      var expectedTextArray = ['Hi ',<Emoticon type="smiley"/>,' nice to ', <Emoticon type="smiley"/>,' see you again!'];

      expect(instance.tokenizeTextArray(':)','smiley', originalTextArray)).toEqual(expectedTextArray);

      var originalTextArray = ['Hi ',<Emoticon type="smiley"/>,' me sad :( !'];
      var expectedTextArray = ['Hi ',<Emoticon type="smiley"/>,' me sad ',<Emoticon type="sad"/>,' !'];

      expect(instance.tokenizeTextArray(':(','sad', originalTextArray)).toEqual(expectedTextArray);
    });
  });

  describe('spliceTextArray', function() {

    it('splices in the newtextarray at the specified index', function() {
      var textArray = ['hi', 'me :)','now woo'];
      var newTextArrayElement = ['woi', 'woo wow'];
      instance.spliceTextArray(textArray, 1, newTextArrayElement);
      expect(textArray).toEqual(['hi', 'woi', 'woo wow','now woo']);
    });
  });
});
