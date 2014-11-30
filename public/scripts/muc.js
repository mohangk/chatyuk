//TODO
// Display roster
// Presence (when people join or leave)
// Prebinding
//   -http://metajack.im/2009/12/14/fastest-xmpp-sessions-with-http-prebinding/
//--
// Join a room, creating one if it does not already exist (done)
// Show room messages - from who, actual message (done)
// Send a message (done)
// Anonymous logins(done)

function addMessage(message)
{
  $('#message-pane').append('<li>'+message.sender+':'+message.body+'</li>')
  console.log('messagecallback', message);
}

function enableMessageBox() {
  $('#message').attr('disabled', false);
}

function disableMessageBox() {
  $('#message').attr('disabled', true);
}

function setButtonAsConnect() {
  var button = $('#connect').get(0);
  button.value = 'connect';
}

function setButtonAsDisconnect() {
  var button = $('#connect').get(0);
  button.value = 'disconnect';
}

function connected() {
  setButtonAsDisconnect();
  enableMessageBox();
}

function disconnected() {
  setButtonAsConnect();
  disableMessageBox();
}

function room() {
   return $('#room').val();
}

function username() {
  return $('#username').val();
}

function password() {
  return $('#pass').val();
}


var comms = null;
$(document).ready(function () {
  comms = Object.create(XmppComms);

  $('#connect').bind('click', function () {
    if (!comms.isConnected()) {
      comms.connect(username(), password(), room(), connected, disconnected, addMessage);
    } else {
      comms.disconnect();
    }
  });

  $(document).on( 'keypress', '#message', function(event) {
    if ( event.which == 13 ) {
      event.preventDefault();
      comms.groupchat(this.value);
      this.value = '';
    }
  });
});
