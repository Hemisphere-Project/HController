var fs = require('fs'),
		httpServer = require('http-server'),
    socket = require('socket.io'),
    path = require('path'),
    events = require('events'),
    util = require('util'),
    colors = require('colors');
    
var HPlayer 		= require('./HPlayer');
var MediaManager 	= require('./MediaManager/MediaManager.js');
var ScenarioManager 	= require('./ScenarioManager/ScenarioManager.js');
var OSCInterface 	= require('./OSCInterface/OSCInterface.js');
    
//var DEFAULT_PORT = 8080;
//var DEFAULT_ROOT_DIR = path.join(__dirname, '../w/root');

//var REFRESH_STATUS_PERIOD = 1000;


/*** Client class ****/

function Client(name, socket){
	this.name = name;
	this.socket = socket;	
}

Client.prototype.sendPlayerStatus = function(status){
	this.socket.emit('playerStatus',status);	
}
Client.prototype.sendScenarioPlayerStatus = function(status){
	this.socket.emit('scenarioPlayerStatus',status);	
}
Client.prototype.sendMediaList = function(list){
	this.socket.emit('mediaList',list);	
}
Client.prototype.sendScenarioList = function(list){
	this.socket.emit('scenarioList',list);	
}
Client.prototype.sendScenario = function(scenario){
	this.socket.emit('scenario',scenario);	
}
Client.prototype.sendScenarioSaved = function(scenariopath){
	this.socket.emit('scenarioSaved',scenariopath);	
}
Client.prototype.sendScenarioCreated = function(scenariopath,scenariolist){
	this.socket.emit('scenarioCreated',scenariopath,scenariolist);	
}
Client.prototype.sendScenarioDeleted = function(scenariolist){
	this.socket.emit('scenarioDeleted',scenariolist);	
}
Client.prototype.addEventListeners = function(webserver){
	
	var self=this;
	
	/************ Scenario section events **************/
	this.socket.on('playScenario', function (scenario) {
			console.log("play scenario  "+scenario);
		if(scenario)
			webserver.oscInterface.playScenario(scenario);
	});
	this.socket.on('stopScenario', function () {
			console.log("stopScenario");
			webserver.oscInterface.stopScenario();
	});
	this.socket.on('getScenario', function (scenario) {
			//webserver.eventEmitter.emit('getScenario',self,data);
		if(scenario)
			self.sendScenario(webserver.scenarioManager.getScenario(scenario));
	});
	this.socket.on('createScenario', function (scenario) {
			//webserver.eventEmitter.emit('createScenario',self,data);
		if(scenario)
			webserver.scenarioManager.createScenario(scenario,function(scenariopath,scenariolist){
				self.sendScenarioCreated(scenariopath,scenariolist);
			});
	});
	this.socket.on('saveScenario', function (data) {
			//webserver.eventEmitter.emit('saveScenario',self,data);
		if(data.scenario && data.scenariopath)
			webserver.scenarioManager.saveScenario(data.scenariopath,data.scenario,function(scenariopath){
				self.sendScenarioSaved(scenariopath);		
			});
	});
	this.socket.on('deleteScenario', function (scenariopath) {
			//webserver.eventEmitter.emit('deleteScenario',self,data);
		if(scenariopath)
			webserver.scenarioManager.deleteScenario(scenariopath,function(scenariolist){
				self.sendScenarioDeleted(scenariolist);		
			});
	});
	
	/************* media player events *****************/
	
	this.socket.on('play', function (media) {
			//webserver.eventEmitter.emit('play',self.socket.id,data);
		if (webserver.player.loop) webserver.oscInterface.playloop(media);
		else webserver.oscInterface.play(media);
		console.log("play  "+media);
	});
	this.socket.on('pause', function (data) {
			//webserver.eventEmitter.emit('pause',self.socket.id);
		webserver.oscInterface.pause();	
		console.log("pause");
	});
	this.socket.on('next', function (data) {
			//webserver.eventEmitter.emit('next',self.socket.id);
		webserver.oscInterface.next();	
		console.log("next");
	});
	this.socket.on('prev', function (data) {
			//webserver.eventEmitter.emit('prev',self.socket.id);
		webserver.oscInterface.prev();	
		console.log("prev");	
	});
	this.socket.on('resume', function (data) {
			//webserver.eventEmitter.emit('resume',self.socket.id);
		webserver.oscInterface.resume();	
		console.log("resume");
	});
	this.socket.on('stop', function (data) {
			//webserver.eventEmitter.emit('stop',self.socket.id);
		webserver.oscInterface.stop();
		console.log("stop");
	});
	this.socket.on('mute', function (data) {
			//webserver.eventEmitter.emit('mute',self.socket.id);
		webserver.oscInterface.mute();
		console.log("mute");	
	});
	this.socket.on('unmute', function (data) {
			//webserver.eventEmitter.emit('unmute',self.socket.id);
		webserver.oscInterface.unmute();
		console.log("unmute");
	});
	this.socket.on('loop', function (data) {
			//webserver.eventEmitter.emit('loop',self.socket.id);
		webserver.oscInterface.loop();
		console.log("loop");
	});
	this.socket.on('unloop', function (data) {
			//webserver.eventEmitter.emit('unloop',self.socket.id);
		webserver.oscInterface.unloop();
		console.log("unloop");
	});
	this.socket.on('volume', function (value) {
			//webserver.eventEmitter.emit('volume',self.socket.id,data);
		webserver.oscInterface.volume(value);	
		console.log("volume "+value);			
	});	
	this.socket.on('zoom', function (value) {
			//webserver.eventEmitter.emit('zoom',self.socket.id,data);
		webserve.oscInterface.zoom(value);
		console.log("zoom "+value);	
	});	
	this.socket.on('blur', function (data) {
			webserver.eventEmitter.emit('blur',self.socket.id,data);
	});	
	this.socket.on('quit', function (data) {
			//webserver.eventEmitter.emit('quit',self.socket.id);
		webserver.stop(0);
		process.exit(0);// not sure 	
	});
	
	/*************** general events ********************/ 
	
	this.socket.on('disconnect',function(){
		for(var k=0;k<webserver.clients.length;k++){
			if(webserver.clients[k].socket.id===self.socket.id){
				webserver.clients.splice(k,1);
				break;
			}
				
		}
	});
}


/*** WebServer class ***/
    
function WebServer(){
		
	
	var configJSON = fs.readFileSync("/home/pi/HController/WebServer/webserver.config");
	if(typeof configJSON === 'undefined')
		return error.log("no config found for WebServer");
	var config = JSON.parse(configJSON);
	
	this.debug = typeof config.WebServer.debug !== 'undefined' ? config.WebServer.debug : true;
	this.port = typeof config.WebServer.port !== 'undefined' ? config.WebServer.port : 8080;
	this.root = typeof config.WebServer.root_dir !== 'undefined' ? path.resolve(__dirname,'../',config.WebServer.root_dir) : path.join(__dirname, './w/static');
	this.refreshStatusPeriod = typeof config.WebServer.refreshStatusPeriod !== 'undefined' ? config.WebServer.refreshStatusPeriod : 1000;

	this.clients = new Array();
	
	this.refreshStatusId = null;

	//this.eventEmitter = new events.EventEmitter();
	this.player			 = new HPlayer(config.HPlayer);
	this.mediaManager	 = new MediaManager(config.MediaManager);
	this.scenarioManager	 = new ScenarioManager(config.ScenarioManager);
	this.oscInterface	 = new OSCInterface(config.OSCInterface);

}

WebServer.prototype.start = function(){
	
	var self = this;
	
	// we have a couple a task to do synchronously before we can start the webserver safely
	var beforeWeStart = [
						{
							context:this.mediaManager,
							method:this.mediaManager.updateMediaList // error handling !!
						},
						{
							context:this.scenarioManager,
							method:this.scenarioManager.updateScenarioList // error handling !!
						}
	];
	function sync(task) 
	{
		if(task) 
		{
			task.method.call(task.context,function(args) {
					return sync(beforeWeStart.shift());
			});
		} 
		else return ;
	}
	sync(beforeWeStart.shift());	
	
	// there we go
	this.server = httpServer.createServer({
		root: this.root,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials': 'true'
		}
	  });
	
	io = socket.listen(this.server.server,{ log: this.debug });
	this.server.listen(this.port);
	io.sockets.on('connection',onSocketConnection);	
	
	function onSocketConnection(socket){
		// change with a proper client name or id
		var client = new Client("none",socket);
		client.addEventListeners(self);
		self.clients.push(client);
		//self.eventEmitter.emit('socketConnection',client);
		client.sendMediaList(self.mediaManager.mediaList);
		client.sendScenarioList(self.scenarioManager.scenarioList);
		client.sendPlayerStatus(self.player.status());
	}
	
	// on media player status handler
	this.oscInterface.eventEmitter.on('status', function(status){
		self.sendPlayerStatus(self.player.status(status));
	});
	
	// on scenario player status handler
	this.oscInterface.eventEmitter.on('spStatus', function(status){
		self.sendScenarioPlayerStatus(status);
	});
	
	this.refreshStatusId = setInterval(function(){
		//self.eventEmitter.emit('getStatus');	
		self.oscInterface.getStatus();	
	},this.refreshStatusPeriod);
	
	console.log('[WebServer]'.green+' started on port '+this.port);
}

WebServer.prototype.stop = function(){
	
	clearInterval(this.refreshStatusId);
	
	this.clients.forEach(function(client){
			client.socket.disconnect();
	});
	
	if (this.server !== undefined) this.server.close();
	console.log('[WebServer] '.red+'stoped');	
}

WebServer.prototype.sendPlayerStatus = function(status){
	this.clients.forEach(function(client){
			client.sendPlayerStatus(status);
	});
}
WebServer.prototype.sendScenarioPlayerStatus = function(status){
	this.clients.forEach(function(client){
			client.sendScenarioPlayerStatus(status);
	});
}

var server = new WebServer();
server.start();

module.exports = WebServer;
