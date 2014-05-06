var osc = require('node-osc');
var events = require('events');
var HPlayer = require('../HPlayer.js');


function OSCInterface(config){
	if(typeof config === 'undefined')
		return console.log("no config found for OSCInterface");
	
	this.url = typeof config.url !== 'undefined' ? config.url : '127.0.0.1';
	this.clientPort = typeof config.clientPort !== 'undefined' ? config.clientPort : 9000;
	this.serverPort = typeof config.serverPort !== 'undefined' ? config.serverPort : 9001;
	this.baseAddress = typeof config.baseAddress !== 'undefined' ? config.baseAddress : "";
	this.base64Encode = typeof config.base64Encode !== 'undefined' ? config.base64Encode : false;

	this.eventEmitter = new events.EventEmitter();
	
	var self = this;
	
	//OSC CLIENT: SEND MESSAGES
	this.oscClient = new osc.Client(this.url, this.clientPort); 
	this.oscClient.sendMessage = function (operation,args){
		var message = new osc.Message(self.baseAddress+'/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
	
		this.send(message);	
	}
	
	//OSC SERVER: RECEIVE MESSAGES
	this.oscServer = new osc.Server(this.serverPort, this.url);
	this.oscServer.on("message", function (message, rinfo) {
		
		var args = message.slice();
		var command = "";	
			
		//Support for direct OSC Message and simple Bundle (with only one message inside)
		while (((typeof command !== 'string') || (command.charAt(0) != "/")) && (args.length > 0))
		{
			command = args.shift();
			while(Object.prototype.toString.call(command) === '[object Array]' ) 
			{
				args = command.slice();
				command = args.shift();
			}
		}
		
		switch(command){
			case "/status":
				var player = new HPlayer();
				player.name = args.shift();
				switch(args.shift()){
					case "playing" :
						player.isPlaying = true;
						player.isPaused = false;
					break;
					case "paused" :
						player.isPlaying = true;
						player.isPaused = true;
					break;
					case "stoped" : 
						player.isPlaying = false;
						player.isPaused = false;
					break;

				}
				if(self.base64Encode)
					player.media.filepath = new Buffer(args.shift(), 'base64').toString('utf8');
				else
					player.media.filepath = args.shift();
				player.media.progress = args.shift();
				player.media.duration = args.shift();
				player.volume = args.shift();
				player.isMuted = (args.shift() === "muted");
				
				self.eventEmitter.emit('status',player.status());
			break;
			case "ended" :
				// nothing for the moment
			break;
			case "looped" :
				// nothing for the moment
			break;
			default: console.log("message not recognized: "+message);	
		}
	});

/***************************   OSCInterface Commands   ************************/


OSCInterface.prototype.quit = function(){
	this.oscClient.sendMessage('quit');
}

// BASIC CONTROLS 
OSCInterface.prototype.play = function(media){
	if(this.base64Encode){
		if(typeof media === "object"){
			for( var k=0;k<media.length;k++){
				media[k] = new Buffer(media[k]).toString('base64');
			}
		}else
			media = new Buffer(media).toString('base64');
	}
	//console.log('play  '+JSON.stringify(media));
	this.oscClient.sendMessage('play',typeof media === "string" ? [media] : media);
	
}
OSCInterface.prototype.playloop = function(media){
	if(this.base64Encode){
		if(typeof media === "object"){
			for( var k=0;k<media.length;k++){
				media[k] = new Buffer(media[k]).toString('base64');
			}
		}else
			media = new Buffer(media).toString('base64');
	}
	console.log('playloop  '+JSON.stringify(media));
	this.oscClient.sendMessage('playloop',typeof media === "string" ? [media] : media);
	
}
OSCInterface.prototype.stop = function(){
	this.oscClient.sendMessage('stop');
	
}
OSCInterface.prototype.pause = function(){
	this.oscClient.sendMessage('pause');
}
OSCInterface.prototype.resume = function(){
	this.oscClient.sendMessage('resume');
}
// SOUND
OSCInterface.prototype.volume = function(value){
	this.oscClient.sendMessage('volume',[value]);
}
OSCInterface.prototype.mute = function(){
	this.oscClient.sendMessage('mute');
}
OSCInterface.prototype.unmute = function(){
	this.oscClient.sendMessage('unmute');	
}
// EFFECTS
OSCInterface.prototype.gaussianBlur = function(blurSize){
	this.oscClient.sendMessage('fx/gaussianBlur',[blurSize]);
}
// PLAYER STATUS REQUEST
OSCInterface.prototype.getStatus = function(){
	this.oscClient.sendMessage('s/getStatus');
}

module.exports = OSCInterface




