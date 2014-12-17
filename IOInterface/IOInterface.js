var MCP3424 = require('mcp3424');
var i2c = require('i2c');


var raspiomix = new Raspiomix();

setInterval(function(){
  //console.log(mcp.getMv(0)); //for channel 0
  //console.log(mcp.getMv(3)); //for channel 3
 	//readRTC(mcp.getMv(0));
 	raspiomix.readAdc(0);
 	//console.log(mcp._readData(0));

}, 100); //first conversion needs a bit time...(smaller resolution -> faster)





/*** Raspiomix Class ***/


function Raspiomix(){
	
	this.IO0 = 12;
	this.IO1 = 11;
	this.IO2 = 13;
	this.IO3 = 15;

	this.DIP0 = 7;
	this.DIP1 = 16;

	this.I2C_ADC_ADDRESS = 0x6E;
	this.I2C_RTC_ADDRESS = 0x68;

	this.ADC_CHANNELS = [ 0x9C, 0xBC, 0xDC, 0xFC ];
	this.ADC_MULTIPLIER = 0.0000386;
	
	this.adcGain = 0; //{0,1,2,3} represents {x1,x2,x4,x8} -- PB avec x8
	this.adcResolution = 1; //{0,1,2,3} and represents {12,14,16,18} bits
	
	this.DEVICE = '/dev/ttyAMA0';
	
	this.adcMCP = new MCP3424(this.I2C_ADC_ADDRESS, this.adcGain, this.adcResolution, '/dev/i2c-1');
	this.adcWire = new i2c(this.I2C_ADC_ADDRESS, {device: '/dev/i2c-1'}); 
	//this.rtcWire = new i2c(this.I2C_RTC_ADDRESS, {device: '/dev/i2c-1'});
	
}


Raspiomix.prototype.readAdc = function(channel){
	if(typeof channel === 'undefined')
		return console.error('no channel provided');
	if(channel > this.ADC_CHANNELS.length - 1)
		return console.error("channel doesn't exist");
	
	
	this.adcMCP._readData(channel,function(err,value){
		if(err)
			return console.error(err);
		
		console.log("channel "+channel+" : "+value);
	});
	
}

Raspiomix.prototype.readRtc = function(){
	
	
}

Raspiomix.prototype.readDigital = function(pin){
	
}



