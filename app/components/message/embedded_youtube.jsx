var React = require('react');
var EmbeddedYoutube = React.createClass({

  render: function() {
    return <iframe src={this.toEmbedUrl()}></iframe>;
  },

  toEmbedUrl: function() {
    return this.props.src.replace(/watch\?v=/, 'embed/');
  }
});

module.exports = EmbeddedYoutube;
