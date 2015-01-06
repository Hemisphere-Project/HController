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
	
	this.responsesPending = {};
	
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
				var value = args.shift();
				this.responsesPending.getDigital(value);
			break;
			case "analogValue" :
				var value = args.shift();
				this.responsesPending.getAnalog(value);
			break;
			default: console.log("message not recognized: "+ message);	
		}	
}



/***************************   OSCInterface Commands   ************************/

ScenarioPlayerOSC.prototype.getDigital = function(channel,callback){
	
	// TODO !!!
	//need something more specific here
	this.responsesPending.getDigital = callback;
	//console.log(this.responsesPending);
	this.oscClient.sendMessage('getDigital',[channel]);
	
}
ScenarioPlayerOSC.prototype.getAnalog = function(channel,callback){
	
	// TODO !!!
	//need something more specific here
	this.responsesPending.getAnalog = callback;
	//console.log(this.responsesPending);
	this.oscClient.sendMessage('getAnalog',[channel]);
	
}


module.exports = ScenarioPlayerOSC;