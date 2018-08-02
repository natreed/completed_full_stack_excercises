'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

var clientIds = {'strClients':[]};
var msg = {};
var this_client = 0;
var msg = {'strFrom':'', 'strTo':'', 'strMessage':''}


io.on('connection', function(objectSocket) {
	// send everyone the 'clients' event, contianing an array with the ids of the connected clients - example: { 'strClients':['GxwYr9Uz...','9T1P4pUQ...'] }
	// send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... connected' }
	this_client += 1;
	clientIds.strClients.push(this_client);

	io.emit('hello', this_client.toString());

	io.emit('clients', clientIds);

	objectSocket.on('message', function(objectData) {
		// if the message should be recevied by everyone, broadcast it accordingly
		// if the message has a single target, send it to this target as well as to the origin
		//this_client = objectData.strFrom;

        for (var id in clientIds.strClients) {
            msg.strMessage = id + "... connected";
            io.emit('message', msg)
        }

        if (objectData.strTo === 'everyone') {
			for (var id in clientIds.strClients)  {
				objectData.strTo = id;
				io.emit('message', objectData);
			}
		}
		else {
			io.emit('message', objectData);
		}
	});

	objectSocket.on('disconnect', function() {
		// send everyone the 'clients' event, contianing an array of the connected clients - example: { 'strClients':['GxwYr9Uz...'] }
		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... disconnected' }

		//removing client and sending updated client list.
		clientIds.strClients = clientIds.strClients.splice(this_client, 1);
		io.emit('clients', clientIds);

		//sending everyone a message that the client has disconnected.
		msg.strFrom = 'server';
		for (id in clientIds.strClients) {
			msg.strTo = id;
			msg.strMessage = id + "... disconnected";
			io.emit('message', msg)
		}
	});
});

console.log('go ahead and open "http://localhost:8080/3-chat.html" in your browser');