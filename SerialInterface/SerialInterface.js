var sp = require("serialport");
var SerialPort = sp.SerialPort;

var events = require('events')

var DEFAULT_BAUD_RATE = 9600;
var DEFAULT_COM_PORT = "/dev/ttyACM0";


function SerialInterface(config){
	
	this.eventEmitter = new events.EventEmitter();
	this.arduinoComList = [];
	if(typeof config !== 'undefined'){
		this.baudRate = typeof config.baudRate !== 'undefined' ? config.baudRate : DEFAULT_BAUD_RATE;
		this.range = config.range;
	}else{
		this.baudRate = DEFAULT_BAUD_RATE;
	}
	var self = this;
	this.getArduinoComList(function(err,list){
			
		if(err)
			return console.log(err);

		console.log(list);
		self.arduinoComList = list;
		
		if(self.arduinoComList.length == 0)
			return console.log("serial error : no arduino com port found");
		if(self.arduinoComList.length>1)
			console.log("more than one arduino device found.. first take first");
		
		self.serialPort = new SerialPort(self.arduinoComList[0], {
				baudrate: this.baudRate,
				parser: sp.parsers.readline("\n")
		},false);		
		
		//self.open();
	});

}	
	

SerialInterface.prototype.open = function(){
	this.addEventListeners();
	this.serialPort.open(function(err){if(err)console.log(err)});
}

SerialInterface.prototype.addEventListeners = function(){
	this.serialPort.on('open', this.openHandler.bind(this));
	this.serialPort.on('data',this.dataHandler.bind(this));
	this.serialPort.on('close', this.closeHandler.bind(this));
	this.serialPort.on('error', this.errorHandler.bind(this));
}
SerialInterface.prototype.removeEventListeners = function(){
	this.serialPort.removeEventListener('open', this.openHandler);
	this.serialPort.removeEventListener('data', this.dataHandler);
	this.serialPort.removeEventListener('close', this.closeHandler);
	this.serialPort.removeEventListener('error', this.errorHandler);
}

/** EVENT HANDLERS **/

SerialInterface.prototype.openHandler = function(){
	this.eventEmitter.emit("open");
}
var last_value = 0;
SerialInterface.prototype.dataHandler = function(data){
	
	var value = map(data,this.range.inMin,this.range.inMax,this.range.outMin,this.range.outMax);
	value = constrain(value,this.range.outMin,this.range.outMax);
	//invert
	value = this.range.outMax - value;
	// raw easing
	value = last_value + (value - last_value)*0.8;
	this.eventEmitter.emit("data",value);
}
SerialInterface.prototype.closeHandler = function(){
	this.eventEmitter.emit("close");
}
SerialInterface.prototype.errorHandler = function(err){
	this.eventEmitter.emit("error",err);
}


SerialInterface.prototype.write = function(buffer,callback){
	this.serialPort.write(buffer,callback);	
}

SerialInterface.prototype.close = function(){	
	this.serialPort.open(function(err){if(err)console.log(err)});
	this.removeEventListener();
}

SerialInterface.prototype.getArduinoComList = function(callback){
	var alist = [];
	sp.list(function (err, ports) {
		if(err)
			return callback(err)
			
		for(var k=0;k<ports.length;k++){
			if(ports[k].pnpId.indexOf("Arduino") > -1){
				//console.log(ports[k].pnpId.indexOf("Arduino"))
				alist.push(ports[k].comName);
			}
		}
		
		return callback(null,alist);
  	});
}

function map(value,inMin,inMax,outMin,outMax){
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function constrain(value,min,max){
	if(value>max)
		return max;
	if(value<min)
		return min;
	
	return value;
}

module.exports = SerialInterface;