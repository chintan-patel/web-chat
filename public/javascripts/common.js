$(function(){
var socket = io.connect()
    , $messages = $('#messages')
    , $input = $('#msg')
    , $button = $('#submit')  
	
function send(){
var msg = $input.val().trim()
    if (msg) {
      socket.emit('message', msg)
      $messages.prepend('<li><span><b>' + socket.id + '</b></span> ' + msg + '</li>')
    }
    $input.val('')
}

socket.on('message', function(data) {
    $messages.prepend('<li><span>' + data.id + '</span> ' + data.msg + '</li>')
})

socket.on('connected', function(id) {
    $messages.prepend('<li class="status"><span>Connected</span> ' + id + '</li>')
  })

//###disconnected
// Another client has disconnected from the application
socket.on('disconnected', function(id) {
	$messages.prepend('<li class="status"><span>Disconnected</span> ' + id + '</li>')
})

// User interaction
// ----------------

//###keypress listener
// Create a keystroke listener on the input element, since we are not sending a 
// traditional form, it would be nice to send the message when we hit `enter`
$input.keypress(function(event) {
	if (event.which == 13) {
		send()
	}
})

//###click listener
// Listen to a `click` event on the submit button to the message through
$button.click(send)

});
