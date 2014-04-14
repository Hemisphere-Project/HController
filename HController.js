/* Main Controller of HP */


// LOAD MODULES
var WebServer = require('./WebServer/WebServer.js');
//var RemoteInterface = require('./RemoteInterface/RemoteInterface.js');
//var SerialInterface = require('./SerialInterface/SerialInterface.js');
var OSCInterface = require('./OSCInterface/OSCInterface.js');
var HPlayer = require('./HPlayer');
var MediaManager = require('./MediaManager/MediaManager.js');


// INSTANCIATE
var webServer = new WebServer();
var oscInterface = OSCInterface();
var player = new HPlayer();
var mediaManager = new MediaManager();

//EVENTS BINDING
oscInterface.eventEmitter.on('status', function(status){
	var updatedStatus = player.status(status);
	webServer.sendPlayerStatus(updatedStatus);
});

webServer.eventEmitter.on('socketConnection',function(client){	
	client.sendMediaList(mediaManager.mediaList);
	client.sendPlayerStatus(player.status());
});

webServer.eventEmitter.on('play', function(socketId,media){
	oscInterface.play(media);
});
webServer.eventEmitter.on('pause', function(socketId){
	oscInterface.pause();	
});
webServer.eventEmitter.on('resume', function(socketId){
	oscInterface.resume();	
});
webServer.eventEmitter.on('stop', function(socketId){
	oscInterface.stop();
});
webServer.eventEmitter.on('mute', function(socketId){
	oscInterface.mute();
});
webServer.eventEmitter.on('unmute', function(socketId){
	oscInterface.unmute();
});
webServer.eventEmitter.on('volume', function(socketId,value){
	oscInterface.volume(value);	
});
webServer.eventEmitter.on('getStatus', function(socketId){
	oscInterface.getStatus();	
});
webServer.eventEmitter.on('quit', function(socketId,value){
	oscInterface.quit();
	webServer.stop();
	process.exit(code=0);
});

//WEBSERVER START
webServer.start();




