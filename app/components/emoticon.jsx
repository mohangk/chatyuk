var React  = require('react');
var emoji_map = require('../emoji_map.js');

var Emoticon = React.createClass({

  backgroundImageStyle: function() {
    return { backgroundImage: 'url("http://twemoji.maxcdn.com/svg/'+emoji_map[this.props.type]+'.svg")' };
  },

  render: function() {
    return <i style={this.backgroundImageStyle()} className='twa' ></i>
  }
});

module.exports = Emoticon;

