require('./global');
var application_root = __dirname,
    express = require("express"),
    http = require('http'),
    path = require("path"),
    fs = require("fs"),
    mongoose = require('mongoose'),
    argv = require('optimist').argv
    
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}
/* CONNECT TO DATABASE HERE */
mongoose.connect(config.database);

var app = require('./express');
var server = http.createServer(app);

server.listen(config.port, function(){
	console.log("listen from port " + config.port);
});
