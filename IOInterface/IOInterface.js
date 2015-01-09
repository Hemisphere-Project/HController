var Raspiomix = require('./Raspiomix.js');
var osc = require('node-osc');


var IODeviceAddesses = {
	raspiomix:"raspiomix",
	grovepi:"grovepi",
	arduino:"arduino"
}
var IOCommands = {
	geta:"getAnalog",
	getd:"getDigital",
	getrtc:"getRtc"
}

function IOInterface(){
	this.raspiomix = new Raspiomix();
	
	
	this.url = '127.0.0.1';
	this.clientPort = 6001;
	this.serverPort = 6000;
	this.baseAddress = "iointerface";

	
	var self = this;
	
	//OSC CLIENT: SEND MESSAGES
	this.oscClient = new osc.Client(this.url, this.clientPort); 
	this.oscClient.sendMessageOSC = function(address,operation, args){
		var message = new osc.Message(address+'/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
	
		self.oscClient.send(message);	
		
	};
	
	//OSC SERVER: RECEIVE MESSAGES
	this.oscServer = new osc.Server(this.serverPort, this.url);
	this.oscServer.on("message", function(message,rinfo){
			self.receiveMessageOSC(message,rinfo);
	});	
	
	var handler = this.stayAlive();
}

IOInterface.prototype.stayAlive = function(){
	var self = this;
	return setInterval(function(){
			//console.log('I am still alive');
			self.raspiomix.printStatus();
	},1000);
}


IOInterface.prototype.receiveMessageOSC = function(message,rinfo){
		
	//console.log(message);
	
		var args = message.slice();
		
		var address = args.shift();
		
		var addressElements = address.split('/');
		
		var baseAddress = addressElements[0];
		//var command = addressElements[1];
		
		if(baseAddress != this.baseAddress)
			return;// console.error("wrong base adrss  "+baseAddress);
		
		var deviceAddress = addressElements[1];
		switch(deviceAddress){
				case IODeviceAddesses.raspiomix :
					var command = addressElements[2];
					switch(command){
						case IOCommands.geta:
							var channel = args.shift();
							this.oscClient.sendMessageOSC(this.baseAddress+"/raspiomix","analogValue",[channel,this.raspiomix.getAdc(channel)]);
						break;
						case IOCommands.getd :
							var channel = args.shift();
							this.oscClient.sendMessageOSC(this.baseAddress+"/raspiomix","digitalValue",[channel,this.raspiomix.readDigital(this.raspiomix.channelToPin(channel))]);
						break;
						case IOCommands.getRtc :
							var channel = args.shift();
							// nothing for the moment
						break;
						default: console.log("message not recognized: "+ message);	
					}
					
				break;
				case IODeviceAddesses.grovepi :
					
				break;
				case IODeviceAddesses.arduino :
					
				break;				
				default: return console.error("IO Address not recognized : "+baseAddress);
		}
	
}

var iointerface = new IOInterface();

module.exports = IOInterface;

