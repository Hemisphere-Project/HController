var Raspiomix = require('./Raspiomix.js');
var osc = require('node-osc');




/*setInterval(function(){
		//raspiomix.printStatus();
		//console.log(raspiomix.getAdc(0));
		//console.log(raspiomix.getAdc(1));
}, 100); //first conversion needs a bit time...(smaller resolution -> faster)
*/



function IOInterface(){
	this.raspiomix = new Raspiomix();
	
	
	this.url = '127.0.0.1';
	this.clientPort = 6000;
	this.serverPort = 6001;
	this.baseAddress = "raspiomix";

	
	var self = this;
	
	//OSC CLIENT: SEND MESSAGES
	this.oscClient = new osc.Client(this.url, this.clientPort); 
	
	//OSC SERVER: RECEIVE MESSAGES
	this.oscServer = new osc.Server(this.serverPort, this.url);
	this.oscServer.on("message", function(message,rinfo){
			self.receiveMessageOSC(message,rinfo);
	});	
	
	var handler = this.stayAlive();
}

IOInterface.prototype.stayAlive = function(){
	return setInterval(function(){
			console.log('I am still alive');
	},3000);
}

IOInterface.prototype.sendMessageOSC = function(operation, args){

	var message = new osc.Message(self.baseAddress+'/'+operation);
	if(typeof args !== 'undefined')// we got args
		for(var k=0;k<args.length;k++)// we push args
			message.append(args[k]);

	this.oscClient.send(message);	
	
}

IOInterface.prototype.receiveMessageOSC = function(message,rinfo){
		
	console.log(message);
	
		var args = message.slice();
		
		var address = args.shift();
		
		var addressElements = address.split('/');
		
		var baseAddress = addressElements[0];
		var command = addressElements[1];
		
		if(baseAddress != this.baseAddress)
			return console.error("wrong base adrss  "+baseAddress);
		
		switch(command){
			case "getAdc":
				var channel = args.shift();
				console.log(this);
				this.oscClient.sendMessage("adcValue",[this.raspiomix.getAdc(channel)]);
			break;
			case "getDigital" :
				var channel = args.shift();
				// nothing for the moment
			break;
			default: console.log("message not recognized: "+ message);	
		}	
}

var iointerface = new IOInterface();

module.exports = IOInterface;

