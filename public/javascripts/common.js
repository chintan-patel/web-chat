$(function(){
	var socket = io.connect()
		, $messages = $('#messages')
		, $input = $('#msg')
		, $button = $('#submit')  
		
	function send() {
		var messages = $input.val().trim()
		if (messages) {
		  socket.emit('message', messages)
		  $messages.append('<li class="myMsg"><span><b>' + socket.id + '</b></span> ' + messages + '</li>')
		}
		$input.val('').focus();
	}

	socket.on('message', function(data) {
		$messages.append('<li><span>' + data.id + '</span> ' + data.msg + '</li>')
	})

	socket.on('connected', function(id) {
		$messages.append('<li class="status"><span>Connected</span> ' + id + '</li>')
	  })

	socket.on('disconnected', function(id) {
		$messages.append('<li class="status"><span>Disconnected</span> ' + id + '</li>')
	})

	$input.keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			send();
			return false;
		}
	})

	$button.click(send)

});
