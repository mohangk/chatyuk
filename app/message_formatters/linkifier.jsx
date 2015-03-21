"use strict";

var React = require('react');

var LinkFinder = require('./link_finder.js');

var Link = require('../components/message/link.jsx');
var EmbeddedImage = require('../components/message/embedded_image.jsx');
var EmbeddedVidio = require('../components/message/embedded_vidio.jsx');
var EmbeddedYoutube = require('../components/message/embedded_youtube.jsx');

module.exports = {

  parse: function(textArray) {

    textArray.forEach(function(text, index) {
      if(typeof text != 'string') { return; }

      var links = LinkFinder.find(text);

      if(links.length === 0) { return; }

      var processedTextArray = this.replaceLinks(links, text);
      this.spliceTextArray(textArray, index, processedTextArray);

    }, this);

    return textArray;
  },

  replaceLinks: function(links, text) {

    var textArray = [text];

    links.forEach(function(link, index) {
      textArray = this.tokenizeTextArray(link, textArray);
    }, this);

    return textArray;
  },

  tokenizeTextArray: function(link, textArray) {

    textArray.forEach(function(text, index) {
      if(typeof text != 'string') { return; }

      var processedTextArray = this.tokenize(link, text);
      this.spliceTextArray(textArray, index, processedTextArray);

    }, this);

    return textArray;
  },


  spliceTextArray: function(textArray, indexToSwap, newTextArrayElement) {
    var args = [indexToSwap, 1].concat(newTextArrayElement);
    Array.prototype.splice.apply(textArray, args);
  },


  tokenize: function(link, text) {
    var textArray = text.split(link.value);
    var processedTextArray=[];

    if(textArray.length == 1) {
      return textArray;
    }

    textArray.forEach(function(element, index) {
      processedTextArray.push(element);

      if(index+1 < textArray.length) {
        processedTextArray.push(this.typeToElement(link.type, link.href));
      }
    }, this);

    return processedTextArray;
  },

  typeToElement: function(type, src) {
    if(type == 'image') {
      return <EmbeddedImage src={src}/>;
    } else if(type == 'vidio') {
      return <EmbeddedVidio src={src}/>;
    } else if(type == 'youtube') {
      return <EmbeddedYoutube src={src}/>;
    } else {
      return <Link href={src}/>;
    }
  },

};
