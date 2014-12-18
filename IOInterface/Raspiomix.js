var MCP3424 = require('mcp3424');
var i2c = require('i2c');
var rpio = require('rpio');

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
	this.adcResolution = 0; //{0,1,2,3} and represents {12,14,16,18} bits
	this.pollADCRate = 40; // in millisec
	
	this.adcValues = [0,0,0,0];
	
	//this.DEVICE = '/dev/ttyAMA0';
	
	this.adcMCP = new MCP3424(this.I2C_ADC_ADDRESS, this.adcGain, this.adcResolution, '/dev/i2c-1');
	//this.adcWire = new i2c(this.I2C_ADC_ADDRESS, {device: '/dev/i2c-1'}); 
	this.rtcWire = new i2c(this.I2C_RTC_ADDRESS, {device: '/dev/i2c-1'});
	
	var handler = this.pollADC();
	
}

Raspiomix.prototype.pollADC = function(){
    var self = this;
    var currentChannel = 0;
    return setInterval((function() {
      self.readAdc(currentChannel);
      currentChannel >= 3 ? currentChannel = 0 : currentChannel++;
      self.adcMCP.setChannel(currentChannel);
      //self.printStatus();
    }), this.pollADCRate);
    
}

Raspiomix.prototype.getAdc = function(channel){
	if(typeof channel === 'undefined')
		return console.error('no channel provided');
	if(channel > this.ADC_CHANNELS.length - 1)
		return console.error("channel doesn't exist");

	return this.adcValues[channel];	
	
}

Raspiomix.prototype.readAdc = function(channel){
	if(typeof channel === 'undefined')
		return console.error('no channel provided');
	if(channel > this.ADC_CHANNELS.length - 1)
		return console.error("channel doesn't exist");
	
	var self = this;
	this.adcMCP._readData(channel,function(err,value){
		if(err)
			return console.error(err);
		
		self.adcValues[channel] = value;
	});
	
}

// TODO debug clock and code this
Raspiomix.prototype.readRtc = function(){
  this.rtcWire.readBytes(0x00, 8, function(err, res) {
  	if(err)
  		return console.error(err)
  	
  	console.log(res)
  		
  });

	
}

Raspiomix.prototype.readDigital = function(pin){
	rpio.setInput(pin)
	console.log("pin "+pin+" : "+rpio.read(pin));
}


Raspiomix.prototype.printStatus = function(){
	console.log('\x1b[2J\x1b[H');

 	console.log('-----------DIGITAL--------------');
 	this.readDigital(this.IO0);
 	this.readDigital(this.IO1);
 	this.readDigital(this.IO2);
 	this.readDigital(this.IO3);
 	this.readDigital(this.DIP0);
 	this.readDigital(this.DIP1);
 	console.log('------------ANALOG--------------');
 	console.log("channel 0 :"+this.getAdc(0));
 	console.log("channel 1 :"+this.getAdc(1));
 	console.log("channel 2 :"+this.getAdc(2));
 	console.log("channel 3 :"+this.getAdc(3));

}


module.exports = Raspiomix;
