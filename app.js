'use strict';

console.log('__dirname:', __dirname);

const PORT = 3000;

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, './index.html'));
});


app.get('/todos', function(req, res) {
	fs.readFile('./todo.json', function(err, data) {
		console.log(data);
		var todos = JSON.parse(data);
		console.log(todos);
		res.send(todos);

	})
	
})

app.post('/add', function(req, res) {
	console.log(req.body);
	fs.readFile('./todo.json', function(err, data) {
		var todoArray = JSON.parse(data);
		todoArray.push(req.body);
		fs.writeFile('./todo.json', JSON.stringify(todoArray), function(err) {
			console.log('hello');
			res.send(todoArray);
		});
	})
})














var server = http.createServer(app);

server.listen(PORT, function() {
	console.log('Server listening on port 3000');
})


