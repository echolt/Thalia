var server = require("./server");
var router = require("./router");
var socket = require("./socket");
var handle = require("./requestHandlers").handle;
var fs = require('fs');


var index = {
	init: function(){
		var s = server.start(router.route, handle);
		var io = require('socket.io').listen(s, {log:false});
		socket.init(io, handle);

	},
	loadWebsites: function (){
		fs.readdirSync('websites/').forEach(function(site){
			if(fs.lstatSync('websites/'+site).isDirectory()) {
				console.log("Adding site: "+site);
				var config, cred;
				try {
					config = require('../websites/'+site+'/config').config;
				} catch (err){
					if(err.code !== 'MODULE_NOT_FOUND') {
						console.log("Warning, your config script for "+site+" is broken!");
						console.log();
					}
				}
				try {
					cred = JSON.parse(fs.readFileSync('websites/'+site+'/cred.json'));
				} catch (err){}
				handle.addWebsite(site, config, cred);
			}
		});
	}
};

index.loadWebsites();
index.init();


