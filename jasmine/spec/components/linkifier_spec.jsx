var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;
var EmbeddedImage = require('../../../app/components/embedded_image.jsx');
var EmbeddedVidio = require('../../../app/components/embedded_vidio.jsx');
var EmbeddedYoutube = require('../../../app/components/embedded_youtube.jsx');

var Link = require('../../../app/components/link.jsx');
var Linkifier = require('../../../app/linkifier.js');
var LinkFinder = require('../../../app/link_finder.js');

describe("EmbeddedImage", function() {

  describe('render', function() {

    it('renders the image that is set in the src property', function() {
      var embeddedImage = <EmbeddedImage src="http://fake.com/fake.png" />;
      instance = TestUtils.renderIntoDocument(embeddedImage);
      expect(instance.getDOMNode().getAttribute('src')).toEqual('http://fake.com/fake.png');
    });

  });
});

describe("EmbeddedVidio", function() {

  describe('render', function() {

    it('renders the vidio that is set in the src property', function() {
      var embeddedVidio = <EmbeddedVidio src="http://www.vidio.com/watch/33775-ganteng-ganteng-serigala-ep-310" />;
      instance = TestUtils.renderIntoDocument(embeddedVidio);
      expect(instance.getDOMNode().tagName).toEqual('IFRAME');
      expect(instance.getDOMNode().getAttribute('src')).toEqual('http://www.vidio.com/embed/33775-ganteng-ganteng-serigala-ep-310');
    });

  });
});

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
      var embeddedYoutube = <EmbeddedYoutube src="http://www.youtube.com/watch?v=bNT-CT25clM" />;
      instance = TestUtils.renderIntoDocument(embeddedYoutube);
      expect(instance.toEmbedUrl()).toEqual('http://www.youtube.com/embed/bNT-CT25clM');
    });
  });
});

describe("Link", function() {
  describe('render', function() {

    it('renders the link that is set in the href property', function() {
      var embeddedLink = <Link href="http://fake.com/awesome.html" />;
      instance = TestUtils.renderIntoDocument(embeddedLink);
      expect(instance.getDOMNode().getAttribute('href')).toEqual('http://fake.com/awesome.html');
    });

    it('opens link in a new tab', function() {
      var embeddedLink = <Link href="http://fake.com/fake.png" />;
      instance = TestUtils.renderIntoDocument(embeddedLink);
      expect(instance.getDOMNode().getAttribute('target')).toEqual('_blank');
    });

  });

})

describe("Linkifier", function() {
  var linkifier = Object.create(Linkifier);

  describe("parse", function() {

    it('uses LinkFinder to find links', function() {
      var linkFinderSpy = spyOn(LinkFinder, 'find').and.callThrough();
      var srcTextArray = ['onlystring'];
      linkifier.parse(srcTextArray);
      expect(linkFinderSpy).toHaveBeenCalledWith('onlystring');
    });

    it('finds the links and passes it to replaceLinks', function() {
      var srcTextArray = ['Hi http://fake.com/fake.png nice', {fakeToken: true}, 'to see you again http://fake.com/fake2.png !', {fakeToken: 'blah'}, 'random string'];
      var expectedTextArray = ['Hi ',<EmbeddedImage src="http://fake.com/fake.png"/>, ' nice', {fakeToken: true},'to see you again ',<EmbeddedImage src="http://fake.com/fake2.png"/>,' !', {fakeToken: 'blah'}, 'random string'];

      expect(linkifier.parse(srcTextArray)).toEqual(expectedTextArray);
    });
  });

  describe("replaceLinks", function() {
    it('takes a string and array of links to be replaced and returns the processes array', function() {

      var links = [{href: 'http://fake.com/fake.png', value: 'fake.com/fake.png', type: 'image'},
                   {href: 'http://fake.com/awesome.html', value: 'fake.com/awesome.html', type: 'url'}];

      var srcText = 'Hi fake.com/fake.png nice to see you again fake.com/awesome.html !';
      var expectedTextArray = ['Hi ',<EmbeddedImage src="http://fake.com/fake.png"/>,' nice to see you again ',<Link href="http://fake.com/awesome.html"/>,' !'];
      expect(linkifier.replaceLinks(links, srcText)).toEqual(expectedTextArray);
    });
  });

  describe("tokenize", function() {
    describe('when link is not in text', function() {

      it('returns the text as a single element in an array', function() {
          var link =  {
            value:'fake.com/fake.png',
            href: 'http://fake.com/fake.png',
            type: 'url'
          };
          expect(linkifier.tokenize(link,'Hi :) nice to see you again!')).toEqual([ 'Hi :) nice to see you again!']);
      });
    });

    describe('when link is in text', function() {

      it('replaces all the token strings with the appropriate element', function() {
          var srcText = 'Hi fake.com/fake.png nice to see you again http://fake.com/fake2.png fake.com/fake.png!';
          var expectedTextArray = ['Hi ',<EmbeddedImage src="http://fake.com/fake.png"/>,' nice to see you again http://fake.com/fake2.png ',<EmbeddedImage src="http://fake.com/fake.png"/>,'!'];

          var link =  {
            value:'fake.com/fake.png',
            href: 'http://fake.com/fake.png',
            type: 'image'
          };
          expect(linkifier.tokenize(link, srcText)).toEqual(expectedTextArray);
      });

    });

  });

  describe('typeToElement', function() {
    it('returns the right element for the passed in type', function() {

      expect(linkifier.typeToElement('image','http://fake.com/fake2.png')).toEqual(<EmbeddedImage src="http://fake.com/fake2.png"/>);
      expect(linkifier.typeToElement('url','http://fake.com/awesome.html')).toEqual(<Link href="http://fake.com/awesome.html"/>);
      expect(linkifier.typeToElement('youtube','http://www.youtube.com/watch?v=bNT-CT25clM')).toEqual(<EmbeddedYoutube src="http://www.youtube.com/watch?v=bNT-CT25clM"/>);

    });

  });

});
