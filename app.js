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

	var faye = require('faye');
    var bayeux = new faye.NodeAdapter({
        mount: '/comet/1'
      , timeout: 60
      , ping: 30
    });

    bayeux.attach(server);
    fayeClients.push(bayeux.getClient());
    console.log('Faye Server listening on port: ' + config.faye_port);
});
