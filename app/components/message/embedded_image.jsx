var React  = require('react');

var ImageUtil = require('../../utils/image.js');

var EmbeddedImage = React.createClass({

  render: function() {
    var style = {
      width: '100%'
    };

    var dimensions = ImageUtil.getDimensions(this.props.src,
                                             this.forceUpdate.bind(this));
  
    if (dimensions.height > dimensions.width) {
      style.width = null;
      style.height = Math.min(dimensions.height, 150);
    }

    return <img style={style} src={this.props.src} />
  }

});

module.exports = EmbeddedImage;
