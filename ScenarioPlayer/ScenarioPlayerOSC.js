var osc = require('node-osc');

function ScenarioPlayerOSC(config){
	
	var self = this;
	
	this.url = '127.0.0.1';
	this.clientPort = 6001;
	this.serverPort = 6000;
	this.baseAddress = "raspiomix";	
	
	//OSC CLIENT: SEND MESSAGES
	this.oscClient = new osc.Client(this.url, this.clientPort); 
	this.oscClient.sendMessage = function(operation, args){
		var message = new osc.Message(self.baseAddress+'/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
		//console.log(message);
		self.oscClient.send(message);	
		
	};
	
	//OSC SERVER: RECEIVE MESSAGES
	this.oscServer = new osc.Server(this.serverPort, this.url);
	this.oscServer.on("message", function(message,rinfo){
			self.receiveMessageOSC(message,rinfo);
	});	
	
	this.cbfifos = {
			digital:{
				IO0:[],
				IO1:[],
				IO2:[],
				IO3:[],
				DIP0:[],
				DIP1:[]
			},
			analog:{
				0:[],
				1:[],
				2:[],
				3:[]
			}
	};
	
	/*setInterval(function(){
			self.printFifos();
	},100);*/
	
}

ScenarioPlayerOSC.prototype.receiveMessageOSC = function(message,rinfo){
		
	//console.log(message);
	
		var args = message.slice();
		var address = args.shift();
		var addressElements = address.split('/');
		
		var baseAddress = addressElements[0];
		var command = addressElements[1];
		
		if(baseAddress != this.baseAddress)
			return console.error("wrong base adrss  "+baseAddress);
		
		switch(command){
			case "digitalValue" :
				var channel = args.shift();
				var value = args.shift();
				var callback = this.cbfifos.digital[channel].shift();
				callback(value);
			break;
			case "analogValue" :
				var channel = args.shift();
				var value = args.shift();
				var callback = this.cbfifos.analog[channel].shift();
				callback(value);
			break;
			default: console.log("message not recognized: "+ message);	
		}	
}



/***************************   IOInterface Commands   ************************/

ScenarioPlayerOSC.prototype.getDigital = function(channel,callback){
	
	// TODO !!!
	//need something more specific here
	this.cbfifos.digital[channel].push(callback);
	//console.log(this.responsesPending);
	this.oscClient.sendMessage('getDigital',[channel]);
	
}
ScenarioPlayerOSC.prototype.getAnalog = function(channel,callback){
	
	// TODO !!!
	//need something more specific here
	this.cbfifos.analog[channel].push(callback);
	//console.log(this.responsesPending);
	this.oscClient.sendMessage('getAnalog',[channel]);
	
}

ScenarioPlayerOSC.prototype.printFifos = function(){
	console.log('\x1b[2J\x1b[H');
	console.log('--------- F I F O S ------------');
 	console.log("IO0 : "+this.cbfifos.digital.IO0.length);
 	console.log("IO1 : "+this.cbfifos.digital.IO1.length);
 	console.log("IO2 : "+this.cbfifos.digital.IO2.length);
 	console.log("IO3 : "+this.cbfifos.digital.IO3.length);
 	console.log("DIP0 : "+this.cbfifos.digital.DIP0.length);
 	console.log("DIP1 : "+this.cbfifos.digital.DIP1.length);
 	console.log("AN 0 :"+this.cbfifos.analog[0].length);
 	console.log("AN 1 :"+this.cbfifos.analog[0].length);
 	console.log("AN 2 :"+this.cbfifos.analog[0].length);
 	console.log("AN 3 :"+this.cbfifos.analog[0].length);
}

/***************************   HPlayer Commands   ************************/

ScenarioPlayerOSC.prototype.play = function(media){
	this.oscClient.sendMessage('play',this.mediaOSCList(media));
}
ScenarioPlayerOSC.prototype.playloop = function(media){
	this.oscClient.sendMessage('playloop',this.mediaOSCList(media));	
}
ScenarioPlayerOSC.prototype.stop = function(){
	this.oscClient.sendMessage('stop');
	
}
ScenarioPlayerOSC.prototype.next = function(){
	this.oscClient.sendMessage('next');
}
ScenarioPlayerOSC.prototype.prev = function(){
	this.oscClient.sendMessage('prev');
}
ScenarioPlayerOSC.prototype.pause = function(){
	this.oscClient.sendMessage('pause');
}
ScenarioPlayerOSC.prototype.resume = function(){
	this.oscClient.sendMessage('resume');
}
ScenarioPlayerOSC.prototype.loop = function(){
	this.oscClient.sendMessage('loop');
}
ScenarioPlayerOSC.prototype.unloop = function(){
	this.oscClient.sendMessage('unloop');	
}
ScenarioPlayerOSC.prototype.zoom = function(value){
	this.oscClient.sendMessage('zoom',[value]);
}
// SOUND
ScenarioPlayerOSC.prototype.volume = function(value){
	//console.log("volume = "+value);
	this.oscClient.sendMessage('volume',[value]);
}
ScenarioPlayerOSC.prototype.mute = function(){
	this.oscClient.sendMessage('mute');
}
ScenarioPlayerOSC.prototype.unmute = function(){
	this.oscClient.sendMessage('unmute');	
}
// EFFECTS
ScenarioPlayerOSC.prototype.blur = function(blurSize){
	this.oscClient.sendMessage('blur',[blurSize]);
}
// PLAYER STATUS REQUEST
ScenarioPlayerOSC.prototype.getStatus = function(){
	//console.log("status asked");
	this.oscClient.sendMessage('s/getStatus');
}



module.exports = ScenarioPlayerOSC;