var ImageUtil = require('../../../app/utils/image.js');

describe("utils.ImageUtil", function() {

  describe('+getDimensions', function() {

    var spy;
    var immediateImage;

    beforeEach(function() {
      spy = jasmine.createSpy('callback');
    });

    context("already loaded", function(){
      var tenByFive = "data:image/gif;base64,R0lGODdhCgAFAMIAAMzMzJaWlrGxsaqqqre3t6Ojo8XFxQAAACwAAAAACgAFAAADEAi63C6DNFlAhQJQC0xQRgIAOw=="

      it("returns the dimensions", function() {
        immediateImage = ImageUtil.getDimensions(tenByFive, spy);
        expect(immediateImage.width).toEqual(10);
        expect(immediateImage.height).toEqual(5);
      });

      it("does not attempt to call the callback (would throw callback undefined exception :-)", function() {
        immediateImage = ImageUtil.getDimensions(tenByFive, null);
        expect(immediateImage.complete).toEqual(true);
      });
    });

    context("loading images asyncronously", function() {
      var oneHundredByFifty;
      var waitingSpy;

      function cacheBusting(src) {
        return src + "?=" + (new Date()).getTime();
      }

      beforeEach(function(done) {
        oneHundredByFifty = cacheBusting("/jasmine/spec/fixtures/100x50.gif");

        waitingSpy = spy.and.callFake(done);
        immediateImage = ImageUtil.getDimensions(oneHundredByFifty, waitingSpy);
      });

      it("immediately returns empty dimensions", function(done) {
        expect(immediateImage.width).toEqual(0);
        expect(immediateImage.height).toEqual(0);
        done();
      });

      it("calls the callback when the image has loaded", function(done) {
        expect(waitingSpy).toHaveBeenCalled();
        done();
      });

      it("returns the dimensions on subsequent calls", function(done) {
        var loadedImage = ImageUtil.getDimensions(oneHundredByFifty, null);
        expect(loadedImage.width).toEqual(100);
        expect(loadedImage.height).toEqual(50);
        done();
      });
    });

  });

});
