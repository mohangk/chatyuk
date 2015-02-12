var TestUtils = React.addons.TestUtils;

describe("Emoticon", function() {

  describe('render', function() {

    it('renders the emoticon for the specifed type', function() {
      instance = TestUtils.renderIntoDocument(<Emoticon type="smiley" />)
      expect(instance.getDOMNode().className).toEqual(instance.emoticonClass());
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
