/**
 * David Ma @Frostickle
 * 14 August 2016
 * I don't know why I need that heartbeat function,
 * but socket.io connections kept dropping.
 * We could count the beats and drop it after too many.
 * I'm not sure if this is an issue.
 */

function init(io, handle){
	//start the heartbeat...
	function sendHeartbeat(){
			setTimeout(sendHeartbeat, 8000);
			io.sockets.emit('drip', { beat : 1 });
	}
	setTimeout(sendHeartbeat, 8000);

	//this stuff happens once, when the server starts:


	//this stuff happens every time a page is loaded:
	io.on('connection', function(socket){
		
		// Heartbeat function to keep connections alive.
    socket.on("drop", function(data){});
    
    // Crappy logging
		console.log("socket connected at "+socket.id+" "+socket.handshake.address.address+" "+socket.handshake.headers.referer);

		var host = socket.handshake.headers.host;
		var website = handle.getWebsite(host);

		if(website != undefined && website.sockets){
	
			website.sockets.on.forEach(function(d){
				socket.on(d.name, d.callback);
			})

			website.sockets.emit.forEach(function(d){
				socket.emit(d.name, d.data);
			})
		}
	});
}

exports.init = init;
