var httpServer = require('http-server'),
    socket = require('socket.io'),
    path = require('path'),
    events = require('events'),
    util = require('util'),
    colors = require('colors');
  
    
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
Client.prototype.sendMediaList = function(list){
	this.socket.emit('mediaList',list);	
}
Client.prototype.addEventListeners = function(webserver){
	var self=this;
	this.socket.on('play', function (data) {
			webserver.eventEmitter.emit('play',self.socket.id,data);
	});
	this.socket.on('pause', function (data) {
			webserver.eventEmitter.emit('pause',self.socket.id);
	});
	this.socket.on('next', function (data) {
			webserver.eventEmitter.emit('next',self.socket.id);
	});
	this.socket.on('prev', function (data) {
			webserver.eventEmitter.emit('prev',self.socket.id);
	});
	this.socket.on('resume', function (data) {
			webserver.eventEmitter.emit('resume',self.socket.id);
	});
	this.socket.on('stop', function (data) {
			webserver.eventEmitter.emit('stop',self.socket.id);
	});
	this.socket.on('mute', function (data) {
			webserver.eventEmitter.emit('mute',self.socket.id);
	});
	this.socket.on('unmute', function (data) {
			webserver.eventEmitter.emit('unmute',self.socket.id);
	});
	this.socket.on('loop', function (data) {
			webserver.eventEmitter.emit('loop',self.socket.id);
	});
	this.socket.on('unloop', function (data) {
			webserver.eventEmitter.emit('unloop',self.socket.id);
	});
	this.socket.on('volume', function (data) {
			webserver.eventEmitter.emit('volume',self.socket.id,data);
	});	
	this.socket.on('quit', function (data) {
			webserver.eventEmitter.emit('quit',self.socket.id);
	});
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
    
function WebServer(config){
		
	if(typeof config === 'undefined')
		return console.log("no config found for WebServer");
	
	this.port = typeof config.port !== 'undefined' ? config.port : 8080;
	this.root = typeof config.root_dir !== 'undefined' ? path.resolve(__dirname,'../',config.root_dir) : path.join(__dirname, '../w/root');
	this.refreshStatusPeriod = typeof config.refreshStatusPeriod !== 'undefined' ? config.refreshStatusPeriod : 1000;

	
	this.clients = new Array();
	
	this.refreshStatusId = null;

	this.eventEmitter = new events.EventEmitter();
	
}

WebServer.prototype.start = function(){
	
	this.server = httpServer.createServer({
		root: this.root,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials': 'true'
		}
	  });
	
	
	io = socket.listen(this.server.server,{ log: false });
	
	this.server.listen(this.port);
	
	io.sockets.on('connection',onSocketConnection);	
	
	var self = this;
	
	function onSocketConnection(socket){
		
		var client = new Client("thierry",socket);
		
		client.addEventListeners(self);
		self.clients.push(client);
		self.eventEmitter.emit('socketConnection',client);
	}
	
	this.refreshStatusId = setInterval(function(){
		self.eventEmitter.emit('getStatus');	
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


module.exports = WebServer;
