/* global document */

"use strict";

var React  = require('react');
var ChatBoxHead = require('./chat_box_head.jsx');

var ChatBox = React.createClass({
  
  getInitialState: function() {
    return {
      minimized: false,
      dragging: false,
      height: 400,
      lastDragY: 0,
    };
  },

  minimize: function() {
    this.setState({minimized: true});
  },

  maximize: function() {
    this.setState({minimized: false});
  },

  dragStart: function(e) {
    if(e.button !== 0) return;
    this.setState({
      dragging: true,
      lastDragY: e.pageY,
    });
    e.stopPropagation();
    e.preventDefault();
  },

  updateHeight: function(e, dragging) {
    var height = this.state.height + (this.state.lastDragY - e.pageY);
    this.setState({dragging: dragging, lastDragY: e.pageY, height: height});
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp: function (e) {
    this.updateHeight(e, false);
  },

  onMouseMove: function (e) {
    if (!this.state.dragging) return;
    this.updateHeight(e, true);
  },

  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  },

  render: function() {

    var controlBoxStyle = {
      display: (this.state.minimized ? 'block' : 'none')
    };

    var chatRoomStyle = {
      display: (!this.state.minimized ? 'block' : 'none')
    };

    var onPageStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 25
    };

    var dragResizeStyle = {
      position: 'absolute',
      width: 200,
      height: 5,
      background: 'transparent',
      border: 0,
      top: 0,
      marginLeft: 0,
      cursor: 'n-resize',
      zIndex: 20
    };

    var boxFlyoutStyle = {
      borderRadius: 4,
      boxShadow: '1px 3px 5px 3px rgba(0, 0, 0, 0.4)',
      height: this.state.height,
      position: 'absolute',
      display: 'block',
      bottom: 5,
      width: 300,
      marginLeft: 0
    };

    return (
         <div id="chatyuk" style={onPageStyle}>
         <a href="#" onClick={this.maximize}  style={controlBoxStyle} id="toggle-controlbox" className="toggle-controlbox"><span className="conn-feedback">Toggle chat</span> </a>
         <div style={chatRoomStyle} className="chatroom">
           <div className="box-flyout" style={boxFlyoutStyle} >
             <div className="dragresize dragresize-tm" onMouseDown={this.dragStart} style={dragResizeStyle}></div>
             <ChatBoxHead onMinimize={this.minimize} />
             <div className="chat-body" >
               <div className="chat-area">
               {this.props.children}
               </div>
             </div>
         </div>
       </div>
       </div>
     );
  }
});

module.exports = ChatBox;
