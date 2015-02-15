var EmbeddedImage = React.createClass({
  render: function() {
    var style =  {
      width: 292
    };

    return <img style={style} src={this.props.src} />
  }
});

var Linkifier = {

  parse: function(textArray) {

    textArray.forEach(function(text, index) {
      if(typeof text != 'string') { return; };

      var links = linkify.find(text);

      if(links.length == 0) { return; };

      var processedTextArray = this.replaceLinks(links, text);
      this.spliceTextArray(textArray, index, processedTextArray);

    }, this);

    return textArray;
  },

  replaceLinks: function(links, text) {

    var textArray = [text];

    links.forEach(function(link, index) {
      textArray = this.tokenizeTextArray(link.value, link.href, textArray);
    }, this);

    return textArray;
  },

  tokenizeTextArray: function(emoticon, type, textArray) {

    textArray.forEach(function(text, index) {
      if(typeof text != 'string') { return; };

      var processedTextArray = this.tokenize(emoticon, type, text);
      this.spliceTextArray(textArray, index, processedTextArray);

    }, this);

    return textArray;
  },


  spliceTextArray: function(textArray, indexToSwap, newTextArrayElement) {
    var args = [indexToSwap, 1].concat(newTextArrayElement);
    Array.prototype.splice.apply(textArray, args);
  },


  tokenize: function(link, href, text) {
    var textArray = text.split(link);
    var processedTextArray=[];

    if(textArray.length == 1) {
      return textArray;
    }

    textArray.forEach(function(element, index) {
      processedTextArray.push(element);               

      if(index+1 < textArray.length) {
        processedTextArray.push(<EmbeddedImage src={href} />);
      }
    });

    return processedTextArray;
  },
};
