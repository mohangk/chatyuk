var TestUtils = React.addons.TestUtils;

describe("EmbeddedImage", function() {

  describe('render', function() {

    it('renders the linke that is set in the src property', function() {
      var embeddedLinke = <EmbeddedImage src="http://fake.com/fake.png" />;
      instance = TestUtils.renderIntoDocument(embeddedLinke);
      expect(instance.getDOMNode().getAttribute('src')).toEqual('http://fake.com/fake.png');
    });

  });
});

describe("Linkifier", function() {
  var linkifier = Object.create(Linkifier);

  describe("parse", function() {
    it('takes a text array and for every string element it finds the links and passes it to replaceLinks', function() {
      var srcTextArray = ['Hi http://fake.com/fake.png nice', {fakeToken: true}, 'to see you again http://fake.com/fake2.png !', {fakeToken: 'blah'}, 'random string'];
      var expectedTextArray = ['Hi ',<EmbeddedImage src="http://fake.com/fake.png"/>, ' nice', {fakeToken: true},'to see you again ',<EmbeddedImage src="http://fake.com/fake2.png"/>,' !', {fakeToken: 'blah'}, 'random string'];

      expect(linkifier.parse(srcTextArray)).toEqual(expectedTextArray);
    });
  });

  describe("replaceLinks", function() {
    it('takes a string and array of links to be replaced and returns the processes array', function() {

      var links = [{href: 'http://fake.com/fake.png', value: 'fake.com/fake.png'}, 
                   {href: 'http://fake.com/fake2.png', value: 'fake.com/fake2.png'}];

      var srcText = 'Hi fake.com/fake.png nice to see you again fake.com/fake2.png !';
      var expectedTextArray = ['Hi ',<EmbeddedImage src="http://fake.com/fake.png"/>,' nice to see you again ',<EmbeddedImage src="http://fake.com/fake2.png"/>,' !'];
      expect(linkifier.replaceLinks(links, srcText)).toEqual(expectedTextArray);
    });
  });

  describe("tokenize", function() {
    describe('when there is no matching linke url', function() {
      it('returns the text as a single element in an array', function() {
          expect(linkifier.tokenize('fake.com/fake.png', 'http://fake.com/fake.png', 'Hi :) nice to see you again!')).toEqual([ 'Hi :) nice to see you again!']);
      });
    });
  
    describe('when passed in with the string to match and property to set', function() {
      it('splits the string at the token and adds an EmbeddedImage element in every occurance of it', function() {
          var srcText = 'Hi fake.com/fake.png nice to see you again http://fake.com/fake2.png fake.com/fake.png!';
          var expectedTextArray = ['Hi ',<EmbeddedImage src="http://fake.com/fake.png"/>,' nice to see you again http://fake.com/fake2.png ',<EmbeddedImage src="http://fake.com/fake.png"/>,'!'];
          expect(linkifier.tokenize('fake.com/fake.png', 'http://fake.com/fake.png', srcText)).toEqual(expectedTextArray);
      });
    });
  });

});
