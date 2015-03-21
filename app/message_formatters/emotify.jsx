"use strict";

var React = require('react');
var Emoticon = require('./../components/message/emoticon.jsx');
var emoji_map = require('./emoji_map.js');

module.exports = {

  emoticons: {'>:)' :'smiling-imp',
              ':)'  :'smiley',
              ':-)' :'smiley',
              ';)'  :'wink',
              ';-)' :'wink',
              ':D'  :'grin',
              ':-D' :'grin',
              ':P'  :'stuck-out-tongue',
              ':-P' :'stuck-out-tongue',
              ':p'  :'stuck-out-tongue',
              ':-p' :'stuck-out-tongue',
              '8)'  :'sunglasses',
              ':S'  :'confused',
              ':\\' :'pensive',
              ':/'  :'pensive',
              '>:(' :'angry',
              ':('  :'disappointed',
              ':-(' :'disappointed',
              ':O'  :'open-mouth',
              ':o'  :'open-mouth',
              ':-O' :'open-mouth',
              '=-O' :'open-mouth',
              '<3'  : 'heart',
              '(^.^)b' :'thumbsup' },

  parse: function(textArray) {

    for(var emoticon in this.emoticons) {
      textArray = this.tokenizeTextArray(emoticon, this.emoticons[emoticon], textArray);
    }

    return textArray;
  },

  tokenizeTextArray: function(emoticon, type, textArray) {

    textArray.forEach(function(text, index) {
      if(typeof text != 'string') { return; }

      var processedTextArray = this.tokenize(emoticon, type, text);
      this.spliceTextArray(textArray, index, processedTextArray);

    }, this);

    return textArray;
  },


  spliceTextArray: function(textArray, indexToSwap, newTextArrayElement) {
    var args = [indexToSwap, 1].concat(newTextArrayElement);
    Array.prototype.splice.apply(textArray, args);
  },


  tokenize: function(emoticon, type, text) {
    var textArray = text.split(emoticon);
    var processedTextArray=[];

    if(textArray.length == 1) {
      return textArray;
    }

    textArray.forEach(function(element, index) {
      processedTextArray.push(element);               

      if(index+1 < textArray.length) {
        processedTextArray.push(<Emoticon type={type} />);
      }
    });

    return processedTextArray;
  },
};
