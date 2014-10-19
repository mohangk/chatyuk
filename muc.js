//TODO
// Join a room (done)
// Show room messages - from who, actual message (done)
// Send a message
// Presence (when people join or leave)

var BOSH_SERVICE = 'http://chatyuk.com:5280/http-bind'
var connection = null;

function log()
{
  console.log('IN CB', arguments)
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
    connection.muc.join('test2@conference.chatyuk.com','mohan2', onMessage, log, log);
  }
}

$(document).ready(function () {
  connection = new Strophe.Connection(BOSH_SERVICE);
  connection.rawInput = rawInput;
  connection.rawOutput = rawOutput;

  $('#connect').bind('click', function () {
    var button = $('#connect').get(0);
    if (button.value == 'connect') {
      button.value = 'disconnect';

      connection.connect($('#jid').get(0).value,
                         $('#pass').get(0).value,
                         onConnect);
    } else {
      button.value = 'connect';
      connection.disconnect();
    }
  });

  $(document).on( 'keypress', '#message', function(event) {
    if ( event.which == 13 ) {
      event.preventDefault();
      connection.muc.groupchat('test2@conference.chatyuk.com',this.value);
      this.value = '';
    }
  });
});
