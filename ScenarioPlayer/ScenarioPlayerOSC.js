var osc = require('node-osc');

function ScenarioPlayerOSC(config){
	
	var self = this;
	
	this.url = '127.0.0.1';
	this.clientPort = 6000;
	this.serverPort = 6001;
	
	this.addresses = {
		iointerface:"iointerface",
		hplayer:"#bundle"
	}
	
	
	//OSC CLIENT: SEND MESSAGES
	this.oscClient = new osc.Client(this.url, this.clientPort); 
	this.oscClient.sendMessage = function(address,operation, args){
		var message = new osc.Message(address+'/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
		//console.log(message);
		self.oscClient.send(message);	
		
	};
	this.oscClientII = new osc.Client(this.url, 9000); 
	this.oscClientII.sendMessage = function(address,operation, args){
		var message = new osc.Message(address+'/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
		//console.log(message);
		self.oscClientII.send(message);	
		
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
		
		switch(baseAddress){
				case this.addresses.iointerface :
						var deviceAddress = addressElements[1];
						switch(deviceAddress){
							case "raspiomix" :
								var command = addressElements[2];
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
							break;
							case "grovepi" :
							break;
							case "arduino" :
							break;
							default: console.log("device not recognized: "+ message);	
						}	
				break;
				case this.addresses.hplayer :
					
				break;				
				default: return console.error("Address not recognized : "+baseAddress);
		}

}



/***************************   IOInterface Commands   ************************/

ScenarioPlayerOSC.prototype.getDigital = function(channel,callback){
	
	// TODO !!!
	//need something more specific here
	this.cbfifos.digital[channel].push(callback);
	//console.log(this.responsesPending);
	this.oscClient.sendMessage(this.addresses.iointerface+'/raspiomix','getDigital',[channel]);
	
}
ScenarioPlayerOSC.prototype.getAnalog = function(channel,callback){
	
	// TODO !!!
	//need something more specific here
	this.cbfifos.analog[channel].push(callback);
	//console.log(this.responsesPending);
	this.oscClient.sendMessage(this.addresses.iointerface+'/raspiomix','getAnalog',[channel]);
	
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
	this.oscClientII.sendMessage(this.addresses.hplayer,'play',media);
}
ScenarioPlayerOSC.prototype.playloop = function(media){
	this.oscClientII.sendMessage(this.addresses.hplayer,'playloop',media);	
}
ScenarioPlayerOSC.prototype.stop = function(){
	this.oscClientII.sendMessage(this.addresses.hplayer,'stop');
}
ScenarioPlayerOSC.prototype.pause = function(){
	this.oscClientII.sendMessage(this.addresses.hplayer,'pause');
}
ScenarioPlayerOSC.prototype.resume = function(){
	this.oscClientII.sendMessage(this.addresses.hplayer,'resume');
}



module.exports = ScenarioPlayerOSC;