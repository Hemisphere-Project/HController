/* Main Controller of HP */


// LOAD MODULES
var WebServer = require('./WebServer/WebServer.js');
//var RemoteInterface = require('./RemoteInterface/RemoteInterface.js');
//var SerialInterface = require('./SerialInterface/SerialInterface.js');
var OSCInterface = require('./OSCInterface/OSCInterface.js');
var HPlayer = require('./HPlayer');
var MediaManager = require('./MediaManager/MediaManager.js');
var ConfigHelper = require('./ConfigHelper.js');
var ProcessManager = require('./ProcessManager/ProcessManager.js');

// LOAD CONFIG
var config = ConfigHelper.loadConfig();
console.log(config.HPlayer.name);

//TODO : base64 filepath
//TODO : Store player state reguraly into config
//TODO : Serial interface + patch

// INSTANCIATE
var webServer = new WebServer(config.WebServer.port,config.WebServer.root_dir);
var oscInterface = OSCInterface(config.OSCInterface.url,OSCInterface.clientPort,OSCInterface.serverPort);
var player = new HPlayer();
	player.status(config.HPlayer);

var mediaManager = new MediaManager(config.MediaManager.mediaDir,config.MediaManager.USBDir);

var processManager = new ProcessManager();

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
webServer.eventEmitter.on('playloop', function(socketId,media){
	oscInterface.playloop(media);
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
webServer.eventEmitter.on('getStatus', function(){
	oscInterface.getStatus();	
});
webServer.eventEmitter.on('quit', function(socketId,value){
	oscInterface.quit();
	webServer.stop();
	process.exit(code=0);
});

//MEDIA MANAGER WORK
//TODO : do it sync !!
mediaManager.loadFromUSBStorage(function(){
		
		mediaManager.updateMediaList();
		webServer.start();
		processManager.spawn(config.ProcessManager.HPlayerPath,['--name',player.name,'--volume',player.volume,'--in',config.OSCInterface.clientPort,'--out',config.OSCInterface.serverPort,'--base64',1],true);
		
});


//WEBSERVER START


//HPlayer START








