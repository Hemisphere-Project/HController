var osc = require('node-osc');
var events = require('events');
var HPlayer = require('../HPlayer.js');

var URL = '127.0.0.1';
var DEFAULT_CLIENT_PORT = 9000;
var DEFAULT_SERVER_PORT = 9001;
var BASE_ADDRESS = '';



module.exports = function (){
	
	this.eventEmitter = new events.EventEmitter();
	
	var oscClient = new osc.Client(URL, DEFAULT_CLIENT_PORT); 
	var oscServer = new osc.Server(DEFAULT_SERVER_PORT, URL);
	
	oscClient.sendMessage = function (operation,args){
		var message = new osc.Message(BASE_ADDRESS+'/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
	
		this.send(message);	
	}
	
	var self = this;
	
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
			/*case "/end":
				console.log("finnished: "+args.shift());
				self.eventEmitter.emit('end');
			break;*/
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
	
	return{
		// BASIC CONTROLS
		quit : function(){
					console.log('quit');
					oscClient.sendMessage('quit');
		},
		play : function(media){
					//console.log('play  '+media);
					oscClient.sendMessage('play',[media]);
		},
		playloop : function(media){
					//console.log('play  '+media);
					oscClient.sendMessage('playloop',[media]);
		},
		stop : function(){
					//console.log('stop');
					oscClient.sendMessage('stop');
		},
		pause : function(){
					///console.log('pause');
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
					console.log('unmute');
					oscClient.sendMessage('unmute');
		},
		// EFFECTS
		gaussianBlur : function(blurSize){
					//console.log('fx/gaussianBlur  '+blurSize);
					oscClient.sendMessage('fx/gaussianBlur',[blurSize]);
		},
		// PLAYER STATUS REQUEST
		getStatus : function(){
					console.log('s/getStatus');
					oscClient.sendMessage('s/getStatus');
		},
		// PLAYER QUIT
		quit : function(){
					console.log('quit');
					oscClient.sendMessage('quit');
		},
		
		eventEmitter : this.eventEmitter

	};
}




