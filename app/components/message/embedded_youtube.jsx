var React = require('react');

var style = {
  width: '100%',
  border: 'none'
};

var EmbeddedYoutube = React.createClass({

  render: function() {
    var embedUrl = this.toEmbedUrl(this.props.src);
    return <iframe style={style} src={embedUrl} scrolling="no" />;
  },

  toEmbedUrl: function(url) {
    return url.replace(/watch\?v=/, 'embed/');
  }

});

module.exports = EmbeddedYoutube;
