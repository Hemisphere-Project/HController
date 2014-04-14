var httpServer = require('http-server'),
    socket = require('socket.io'),
    path = require('path'),
    events = require('events'),
    util = require('util'),
    colors = require('colors');
  
    
var DEFAULT_PORT = 8080;
var DEFAULT_ROOT_DIR = path.join(__dirname, '../w/root');


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


/*** WebServer class ****/
    
function WebServer(port,root){
		
	
	this.port = typeof port !== 'undefined' ? port : DEFAULT_PORT;
	this.root = typeof root !== 'undefined' ? root : DEFAULT_ROOT_DIR;
	
	this.clients = new Array();

	this.eventEmitter = new events.EventEmitter();
}

WebServer.prototype.start = function(){
	server = httpServer.createServer({
		root: this.root,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Credentials': 'true'
		}
	  });
	
	
	io = socket.listen(server.server,{ log: false });
	
	server.listen(this.port);
	
	io.sockets.on('connection',onSocketConnection);	
	
	var self = this;
	
	function onSocketConnection(socket){
		
		var client = new Client("thierry",socket);
		
		client.addEventListeners(self);
		self.clients.push(client);
		self.eventEmitter.emit('socketConnection',client);
	}
	
	self.eventEmitter.emit('getStatus',io.id);
	console.log('WebServer Started  '.green+this.port);
}

WebServer.prototype.stop = function(){
	
	this.clients.forEach(function(client){
			client.socket.disconnect();
	});
	
	server.close();
	console.log('WebServer Stoped'.red);	
}

WebServer.prototype.sendPlayerStatus = function(status){
	this.clients.forEach(function(client){
			client.sendPlayerStatus(status);
	});
}


module.exports = WebServer;
