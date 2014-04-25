var osc = require('node-osc');
var events = require('events');
var HPlayer = require('../HPlayer.js');

var DEFAULT_URL = '127.0.0.1';
var DEFAULT_CLIENT_PORT = 9000;
var DEFAULT_SERVER_PORT = 9001;
var BASE_ADDRESS = '';

var BASE_64_ENCODE = true;


module.exports = function (config){
	
	var url = typeof config.url !== 'undefined' ? config.url : DEFAULT_URL;
	var clientPort = typeof config.clientPort !== 'undefined' ? config.clientPort : DEFAULT_CLIENT_PORT;
	var serverPort = typeof config.serverPort !== 'undefined' ? config.serverPort : DEFAULT_SERVER_PORT;
	
	this.eventEmitter = new events.EventEmitter();
	
	var self = this;
	
	//OSC CLIENT: SEND MESSAGES
	var oscClient = new osc.Client(url, clientPort); 
	oscClient.sendMessage = function (operation,args){
		var message = new osc.Message(BASE_ADDRESS+'/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
	
		this.send(message);	
	}
	
	//OSC SERVER: RECEIVE MESSAGES
	var oscServer = new osc.Server(serverPort, url);
	oscServer.on("message", function (message, rinfo) {
		
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
				if(BASE_64_ENCODE)
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
	
	//OSC INTERFACE COMMANDS
	return{
		// BASIC CONTROLS
		quit : function(){
					//console.log('quit');
					oscClient.sendMessage('quit');
		},
		play : function(media){
					//console.log('play  '+media);
					if(BASE_64_ENCODE){
						media = new Buffer(media).toString('base64');	
					}
					oscClient.sendMessage('play',[media]);
		},
		playloop : function(media){
					//console.log('play  '+media);
					if(BASE_64_ENCODE){
						media = new Buffer(media).toString('base64');	
					}
					oscClient.sendMessage('playloop',[media]);
		},
		stop : function(){
					//console.log('stop');
					oscClient.sendMessage('stop');
		},
		pause : function(){
					//console.log('pause');
					oscClient.sendMessage('pause');
		},
		resume : function(){
					//console.log('resume');
					oscClient.sendMessage('resume');
		},
		// SOUND
		volume : function(value){
					//console.log('volume  '+value);
					oscClient.sendMessage('volume',[value]);
		},
		mute : function(){
					//console.log('mute');
					oscClient.sendMessage('mute');
		},
		unmute : function(){
					//console.log('unmute');
					oscClient.sendMessage('unmute');
		},
		// EFFECTS
		gaussianBlur : function(blurSize){
					//console.log('fx/gaussianBlur  '+blurSize);
					oscClient.sendMessage('fx/gaussianBlur',[blurSize]);
		},
		// PLAYER STATUS REQUEST
		getStatus : function(){
					//console.log('s/getStatus');
					oscClient.sendMessage('s/getStatus');
		},
		
		eventEmitter : this.eventEmitter

	};
}




