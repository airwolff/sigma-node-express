var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// middleware function, gets executed on each request
app.use(function (req, res, next) {
	console.log('Got a request!');
	next();
});

// middleware for parsing the body and turning it into a JS object
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/', function (req, res) {
	console.log('req.body=', req.body);
	res.sendStatus(200);
});

app.get('/', function (req, res) {
	console.log('Received a request at', new Date());
	// __dirname is the folder this file lives in
	var filename = path.join(__dirname, 'public/views/index.html');
	console.log('filename:', filename);
	res.sendFile(filename);
});



var same = true;
var songs = [];
app.post('/songs', function (req, res) {
	var name = req.body.title;
	var band = req.body.artist;
	songs.forEach(function (songs) {
		var storedName = songs.title;
		var storedBand = songs.artist;
		if (name.toLowerCase.trim == storedName.toLowerCase.trim && band.toLowerCase.trim == storedBand.toLowerCase.trim) {
			same = false;
		}
	});
	if (same !== true) {
		res.sendStatus(451);
	} else {
		songs.push(req.body);
		console.log('songs', songs);
		res.sendStatus(200);
	}
});

app.get('/songs', function (req, res) {
	res.send(songs);
});

// middleware for serving static files
app.use(express.static('public'));

app.listen(3000);




// Before pushing to our array, add a property to the new song object for the dateAdded with the current date. You'll have to look up the Date object in javascript.
