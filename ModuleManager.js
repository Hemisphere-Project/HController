/* Events Routing */

// LOAD MODULES
var WebServer 		= require('./WebServer/WebServer.js');
var OSCInterface 	= require('./OSCInterface/OSCInterface.js');
var HPlayer 		= require('./HPlayer');
var MediaManager 	= require('./MediaManager/MediaManager.js');
var ConfigHelper 	= require('./ConfigHelper.js');
var ProcessManager 	= require('./ProcessManager/ProcessManager.js');
//var RemoteInterface = require('./RemoteInterface/RemoteInterface.js');
//var SerialInterface = require('./SerialInterface/SerialInterface.js');

/**
MODULE MANAGER
**/
function ModuleManager(){
	
	this.config			= ConfigHelper.loadConfig();
	this.webServer		= new WebServer(this.config.WebServer);
	this.oscInterface	= OSCInterface(this.config.OSCInterface);
	this.player			= new HPlayer(this.config.HPlayer);
	this.mediaManager	= new MediaManager(this.config.MediaManager);
	this.processManager = new ProcessManager();
	
	this.link();	
}

/**
LINK MODULE EVENTS
**/
ModuleManager.prototype.link = function() {
	
	var self = this;

	this.oscInterface.eventEmitter.on('status', function(status){
		self.webServer.sendPlayerStatus(self.player.status(status));
	});

	this.webServer.eventEmitter.on('socketConnection',function(client){	
		client.sendMediaList(self.mediaManager.mediaList);
		client.sendPlayerStatus(self.player.status());
	});

	this.webServer.eventEmitter.on('play', function(socketId,media){
		self.oscInterface.play(media);
	});
	
	this.webServer.eventEmitter.on('playloop', function(socketId,media){
		self.oscInterface.playloop(media);
	});
	
	this.webServer.eventEmitter.on('pause', function(socketId){
		self.oscInterface.pause();	
	});
	
	this.webServer.eventEmitter.on('resume', function(socketId){
		self.oscInterface.resume();	
	});
	
	this.webServer.eventEmitter.on('stop', function(socketId){
		self.oscInterface.stop();
	});
	
	this.webServer.eventEmitter.on('mute', function(socketId){
		self.oscInterface.mute();
	});
	
	this.webServer.eventEmitter.on('unmute', function(socketId){
		self.oscInterface.unmute();
	});
	
	this.webServer.eventEmitter.on('volume', function(socketId,value){
		self.oscInterface.volume(value);	
	});
	
	this.webServer.eventEmitter.on('getStatus', function(){
		self.oscInterface.getStatus();	
	});
	
	this.webServer.eventEmitter.on('quit', function(socketId,value){
		self.stop(0);
	});
}

/**
START ALL
**/
ModuleManager.prototype.start = function() {
	
	//HPLAYER ZOMBIES KILLER
	this.processManager.cleanZombies('HPlayer');

	//WEBSERVER START
	this.webServer.start();

	//HPlayer START
	this.processManager.spawn(this.config.ProcessManager.HPlayerPath,['--name',this.player.name,'--volume',this.player.volume,'--in',this.config.OSCInterface.clientPort,'--out',this.config.OSCInterface.serverPort,'--base64',0],true);

}

/**
STOP ALL
**/
ModuleManager.prototype.stop = function(code) {
	
	this.oscInterface.quit();
	this.webServer.stop();
	this.processManager.killAll();
	
	process.exit(code);
}



module.exports = ModuleManager;
