var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;
var EmbeddedImage = require('../../../app/components/message/embedded_image.jsx');
var EmbeddedVidio = require('../../../app/components/message/embedded_vidio.jsx');
var EmbeddedYoutube = require('../../../app/components/message/embedded_youtube.jsx');
var Link = require('../../../app/components/message/link.jsx');

var Linkifier = require('../../../app/message_formatters/linkifier.jsx');
var LinkFinder = require('../../../app/message_formatters/link_finder.js');



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
