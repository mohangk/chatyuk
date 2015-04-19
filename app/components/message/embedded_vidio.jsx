"use strict";

var React = require('react');

var style =  {
  width: '100%',
  border: 'none'
};

var EmbeddedVidio = React.createClass({

  render: function() {
    var embedUrl = this.toEmbedUrl(this.props.src);
    return <iframe style={style} src={embedUrl} scrolling="no" />
  },

  toEmbedUrl: function(url) {
    return url.replace(/watch/, 'embed');
  }


});

module.exports = EmbeddedVidio;
