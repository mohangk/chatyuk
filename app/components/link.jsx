var Link = React.createClass({
  render: function() {
    return <a target='_blank' href={this.props.href}>{this.props.href}</a>
  }
});

module.exports = Link;
