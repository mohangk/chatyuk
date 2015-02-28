var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Link = require('../../../app/components/link.jsx');

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
