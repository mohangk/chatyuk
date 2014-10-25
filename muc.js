//TODO
// Anonymous logins
// Display roster 
// Presence (when people join or leave)
// Prebinding
//--
// Join a room, creating one if it does not already exist (done)
// Show room messages - from who, actual message (done)
// Send a message (done)

var CHAT_SERVER = 'chatyuk.com'
var CONFERENCE_SERVER = 'conference.chatyuk.com'
var BOSH_SERVICE = 'http://'+CHAT_SERVER+':5280/http-bind'
var connection = null;

function log()
{
  console.log('IN CB', arguments)
  return true;
}

function onMessage(message, room)
{
  var $message = $(message),
      body = $message.children('body').text(),
      jid = $message.attr('from'),
      resource = Strophe.getResourceFromJid(jid),
      sender = resource && Strophe.unescapeNode(resource) || '',
      delayed = $message.find('delay').length > 0,
      subject = $message.children('subject').text();
  $('#message-pane').append('<li>'+sender+':'+body+'</li>')
  console.log('messagecallback', message);
  return true;
}

function rawInput(data)
{
    console.log('RECV: ',data);
}

function rawOutput(data)
{
    console.log('SENT: ',data);
}

function onConnect(status)
{
  if (status == Strophe.Status.CONNECTING) {
    console.log('Strophe is connecting.');
  } else if (status == Strophe.Status.CONNFAIL) {
    console.log('Strophe failed to connect.');
    $('#connect').get(0).value = 'connect';
  } else if (status == Strophe.Status.DISCONNECTING) {
    console.log('Strophe is disconnecting.');
  } else if (status == Strophe.Status.DISCONNECTED) {
    console.log('Strophe is disconnected.');
    $('#connect').get(0).value = 'connect';
  } else if (status == Strophe.Status.CONNECTED) {
    console.log('Strophe is connected.');
    $('#message').attr('disabled', false);
    connection.muc.join(room(), username(), onMessage, log, log);
  }
}

function room() {
   return $('#room').val()+'@'+CONFERENCE_SERVER;
}

function username() {
  return $('#username').val();
}

function jid() {
  //if password is blank we assume this is an anonymous login
  if(password() == '') {
    return CHAT_SERVER;
  } else {
    return username()+'@'+CHAT_SERVER;
  }
}

function password() {
  return $('#pass').val();
}

$(document).ready(function () {
  connection = new Strophe.Connection(BOSH_SERVICE);
  connection.rawInput = rawInput;
  connection.rawOutput = rawOutput;

  $('#connect').bind('click', function () {
    var button = $('#connect').get(0);
    if (button.value == 'connect') {
      button.value = 'disconnect';

      connection.connect(jid(),
                         password(),
                         onConnect);
    } else {
      button.value = 'connect';
      connection.disconnect();
    }
  });

  $(document).on( 'keypress', '#message', function(event) {
    if ( event.which == 13 ) {
      event.preventDefault();
      connection.muc.groupchat(room(),this.value);
      this.value = '';
    }
  });
});
