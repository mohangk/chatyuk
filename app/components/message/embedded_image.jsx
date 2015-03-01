var React  = require('react');
var EmbeddedImage = React.createClass({
  render: function() {
    var style =  {
      width: 292
    };

    return <img style={style} src={this.props.src} />
  }
});

module.exports = EmbeddedImage;
