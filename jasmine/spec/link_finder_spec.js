var LinkFinder = require('../../app/link_finder.js');

describe("LinkFinder", function() {

  describe('find', function() {
    var linkifySpy;
    var remapTypeSpy;

    beforeEach(function() {
      linkifySpy = spyOn(linkify, 'find').and.returnValue('fakeValue');
      remapTypeSpy = spyOn(LinkFinder, 'remapTypes').and.returnValue('remapped values');
    });

    it('delegates the call to linkify.find', function() {
      var results = LinkFinder.find('me no have links');
      expect(linkifySpy).toHaveBeenCalledWith('me no have links');
    });

    describe('when linkify.find finds links',function() {
      it('remaps the types by passing the results to remapType and returns it', function() {
        var results = LinkFinder.find('me no have links');
        expect(remapTypeSpy).toHaveBeenCalledWith('fakeValue');
        expect(results).toEqual('remapped values');
      });
    });

  });

  describe('remapTypes', function() {

    it('remaps an array of links', function() {
      var links = [{
          href: "http://google.com",
          type: "url",
          value: "google.com"
        },
        { href: "http://google.com/image.png",
          type: "url",
          value: "google.com/image.png"
        },
        { href: "http://www.youtube.com/watch?v=bNT-CT25clM",
          type: "url",
          value: "www.youtube.com/watch?v=bNT-CT25clM"
        }
      ];

      var remapLinks = LinkFinder.remapTypes(links);
      expect(remapLinks[0].type).toEqual('url');
      expect(remapLinks[1].type).toEqual('image');
      expect(remapLinks[2].type).toEqual('youtube');

    });
  });

  describe('isImage', function(){
    describe('when the passed in url that ends with an image file extenstion', function() {
      it('returns true', function() {
        var imageTypes = ['png', 'jpg', 'gif'];
        imageTypes.forEach(function(ext) {
          expect(LinkFinder.isImageExt('fake_file.'+ext)).toEqual(true);
        });
      });
    });

    describe('when not an image type',function() {
      it('returns false', function() {
        expect(LinkFinder.isImageExt('fake_file.txt')).toEqual(false);
      });
    });
  });

  describe('isYoutubeLink', function(){
    describe('when the passed in is youtube url', function() {
      it('returns true', function() {
        var youtubeUrl = 'http://www.youtube.com/watch?v=bNT-CT25clM';
        expect(LinkFinder.isYoutubeLink(youtubeUrl)).toEqual(true);
      });
    });

    describe('when not a youtube url',function() {
      it('returns false', function() {
        var fakeYoutubeUrl = 'http://www.mytube.com/watch?v=bNT-CT25clM';
        expect(LinkFinder.isYoutubeLink(fakeYoutubeUrl)).toEqual(false);
      });
    });
  });
});
