function ScenarioAPI(osc){
	
	var eventPollingPeriod = 100;//ms
	var self = this;
	
	this.osc = osc;
	// verififer que contexte node accessible à l'interieur des methodes
	
	this.print = function(what){
			console.log("\x1B[32m"+what+"\x1B[39m");
	}
	
	this.readDigital = function(channel,callback){
			self.osc.getDigital(channel,callback);
	}

	/*	this.readDigitalSync = function(channel){
		
	});*/

	this.onDigital = function(channel,handler){
			var h = setInterval(function(){
					self.osc.getDigital(channel,handler);		
			},eventPollingPeriod);
	}

	this.onDigitalChange = function(channel,handler){
			var lastValue = null;
			var h = setInterval(function(){
					self.osc.getDigital(channel,function(val){
							if(val != lastValue)
								handler(val);
							lastValue = val;
					});		
			},eventPollingPeriod);
	}	
	
	this.readAnalog = function(channel,callback){
			self.osc.getAnalog(channel,callback);
	}
	
	this.onAnalog = function(channel,handler){
			var h = setInterval(function(){
					self.osc.getAnalog(channel,handler);		
			},eventPollingPeriod);
	}
	
}

module.exports = ScenarioAPI;
