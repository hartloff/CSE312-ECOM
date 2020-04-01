const http = require('http');
const html = require('escape-html');
const express = require('express');
const socketio = require('socket.io');

const mongo = require('mongodb');
const monk = require('monk');

let db = monk('mongo:27017/chat');
let chatCollection = db.get('history');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const port = 8000;

app.use(express.static('public'));

app.get('/', function (req, res) {
		res.sendFile('public/index.html');
	}
);

io.on('connection', function (socket) {

	socket.on('message', function (message) {
		const parsedMessage = JSON.parse(message);
		const username = html(parsedMessage['username']);
		let messageText = html(parsedMessage['message']);
		if (messageText.length > 200) {
			messageText = messageText.slice(0, 200) + "..."
		}
		chatCollection.insert({'username': username, 'message': messageText});
		io.sockets.emit('message', JSON.stringify({'username': username, 'message': messageText}));
	})

});


app.get('/chat-history', function (req, res) {
	chatCollection.find({}, {'_id':0}, function (err, data) {
			if (err) {
				console.log(err);
				res.send("error");
			} else {
				console.log(data);
				res.send(data);
			}
		});
	}
);


app.use(function (req, res, next) {
	res.status(404).send("404'ed")
});


server.listen(port, function () {
		console.log('Example app listening on port ' + port + '!');
	}
);
