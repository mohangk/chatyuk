var EmbeddedVidio = React.createClass({
  render: function() {
    var style =  {
      width: 292
    };

    embed_url = this.props.src.replace(/watch/, 'embed');
    return <iframe style={style} src={embed_url} />
  }
});

module.exports = EmbeddedVidio;
