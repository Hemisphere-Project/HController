/* Events Routing */

// LOAD MODULES
var WebServer 		= require('./WebServer/WebServer.js');
var OSCInterface 	= require('./OSCInterface/OSCInterface.js');
var HPlayer 		= require('./HPlayer');
var MediaManager 	= require('./MediaManager/MediaManager.js');
var ConfigHelper 	= require('./ConfigHelper.js');
var ProcessManager 	= require('./ProcessManager/ProcessManager.js');
//var RemoteInterface = require('./RemoteInterface/RemoteInterface.js');
var SerialInterface = require('./SerialInterface/SerialInterface.js');

/**
MODULE MANAGER
**/
function ModuleManager(){
	
	this.isRunning 	= false;
	
	this.config			 = ConfigHelper.loadConfig();
	this.webServer		 = new WebServer(this.config.WebServer);
	this.oscInterface	 = new OSCInterface(this.config.OSCInterface);
	this.player			 = new HPlayer(this.config.HPlayer);
	this.mediaManager	 = new MediaManager(this.config.MediaManager);
	this.processManager  = new ProcessManager();
	this.serialInterface = new SerialInterface(this.config.SerialInterface);
	
	this.link();
	
	this.startupList = [
						{
							context:this.mediaManager,
							method:this.mediaManager.loadFromUSBStorage
						},
						{
							context:this.mediaManager,
							method:this.mediaManager.updateMediaList
						},
						{	
							context:this,
							method:this.startServices
						}];
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
		if (self.player.loop) self.oscInterface.playloop(media);
		else self.oscInterface.play(media);
	});
	
	this.webServer.eventEmitter.on('next', function(socketId){
		self.oscInterface.next();	
	});
	
	this.webServer.eventEmitter.on('prev', function(socketId){
		self.oscInterface.prev();	
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
	
	this.webServer.eventEmitter.on('loop', function(socketId){
		self.oscInterface.loop();
	});
	
	this.webServer.eventEmitter.on('unloop', function(socketId){
		self.oscInterface.unloop();
	});
	
	this.webServer.eventEmitter.on('volume', function(socketId,value){
		self.oscInterface.volume(value);	
	});
	
	this.webServer.eventEmitter.on('getStatus', function(){
		self.oscInterface.getStatus();	
	});
	
	this.webServer.eventEmitter.on('quit', function(socketId,value){
		self.stop(0);
		process.exit(0);
	});
	
	this.serialInterface.eventEmitter.on('open',function(){
		console.log("serial port open");	
	});
	
	this.serialInterface.eventEmitter.on('error',function(err){
		console.log("serial port error "+err);	
	});
		
	this.serialInterface.eventEmitter.on('close',function(){
		console.log("serial port closed");	
	});
			
	this.serialInterface.eventEmitter.on('volume',function(value){
		self.oscInterface.volume(value);
	});
	this.serialInterface.eventEmitter.on('gaussianBlur',function(value){
		self.oscInterface.gaussianBlur(value);
	});
}	

/**
START ALL
**/
ModuleManager.prototype.start = function() {	
	
	var self = this;
	
	//START STACK
	function sync(task) 
	{
		if(task) 
		{
			task.method.call(task.context,function(args) {
					return sync(self.startupList.shift());
			});
		} 
		else return ;
	}
	
	sync(self.startupList.shift());
}

/**
START SERVICES
**/
ModuleManager.prototype.startServices = function() {	
	
	var that = this;

	//HPLAYER ZOMBIES KILLER
	this.processManager.cleanZombies('HPlayer');

	//WEBSERVER START
	this.webServer.start();	

	//HPlayer START
	this.processManager.spawn(
		this.config.ProcessManager.HPlayerPath,
		[
			'--name',this.player.name,
			'--volume',this.player.volume,
			'--in',this.config.OSCInterface.clientPort,
			'--out',this.config.OSCInterface.serverPort,
			'--base64',(this.config.OSCInterface.base64Encode)?1:0,
			'--loop',(this.player.loop)?1:0,
			'--glsl',(this.player.glsl)?1:0,
			'--ahdmi',(this.player.hdmiAudio)?1:0,
			'--info',(this.player.info)?1:0,
			'--media',(that.config.ModuleManager.playlistAutoLaunch) ? that.mediaManager.mediaDirectory : 'none'
		],
		true,	//re-start if killed
		false);  //pipe stdout to console log

		
	/********* TO BE REPLACED WITH MEDIA ON SPAWN ********************/
	//CRADOS --> find a way to know if the HPlayer is ready to receive playlist !
	//=> wait for the first status ?? 
	/*setTimeout(function(){
	if(that.config.ModuleManager.playlistAutoLaunch){
		if(that.mediaManager.mediaList.length == 0){// nothing to play
			console.log("no media to play".red)
		}else if(that.mediaManager.mediaList.length == 1){// one media, we send the media
			that.oscInterface.playloop(that.mediaManager.mediaList[0].filepath);
		}else{// more than one media, we send the dir
			that.oscInterface.playloop(that.mediaManager.mediaDirectory);
		}
	}
	},2000);*/
	/********************************************************************/
		
	
	//SERIAL START
	this.serialInterface.start();
	
	console.log('Running..'.green+'\n');
	this.isRunning = true;
}



/**
STOP ALL
**/
ModuleManager.prototype.stop = function() {
	
	if (this.isRunning) 
	{
		this.webServer.stop();
		this.processManager.killAll();
	}
	this.isRunning = false;
}

module.exports = ModuleManager;

