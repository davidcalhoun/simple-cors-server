#!/usr/bin/env node

var express = require('express');
var app = express();
var path = require('path');

var config = {
	port: process.argv[2] || process.env.PORT || 9000,
	path: process.cwd()
}

var log = function(req, res, next) {
	console.log(req.method + ' ' + (res.statusCode || '') + ' ' + req.url);
	next();
}

// CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
}

var serveFile = express.static(path.resolve(config.path));

app.use(log);
app.use(allowCrossDomain);
app.use(serveFile);

app.listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});