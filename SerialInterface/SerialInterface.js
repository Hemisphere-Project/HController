var sp = require("serialport");
var SerialPort = serialport.SerialPort;

var DEFAULT_BAUD_RATE = 9600;
var DEFAULT_COM_PORT = "/dev/ttyACM0";


function SerialInterface(config){
	
	this.arduinoComList = [];
	this.baudRate = typeof config.baudRate !== 'undefined' ? config.baudRate : DEFAULT_BAUD_RATE;
	var self = this;
	this.getArduinoComList(function(err,list){
			
		if(err)
			return console.log(err);

		self.arduinoComList = list;
		
		if(self.arduinoComList.length == 0)
			return console.log("serial error : no arduino com port found");
		if(self.arduinoComList.length>1)
			console.log("more than one arduino device found.. first take first");
		
		self.serialPort = new SerialPort(arduinoComList[0], {
				baudrate: this.baudRate,
				parser: serialport.parsers.readline("\n")
		},false);		
	});

});	
	
}

SerialInterface.prototype.open = function(){
	this.addEventListeners();
	this.serialPort.open(function(err){if(err)console.log(err)});
}

SerialInterface.prototype.addEventListeners = function(){
	this.serialPort.on('open', this.openHandler);
	this.serialPort.on('data', this.dataHandler);
	this.serialPort.on('close', this.closeHandler);
	this.serialPort.on('error', this.errorHandler);
}
SerialInterface.prototype.removeEventListeners = function(){
	this.serialPort.removeEventListener('open', this.openHandler);
	this.serialPort.removeEventListener('data', this.dataHandler);
	this.serialPort.removeEventListener('close', this.closeHandler);
	this.serialPort.removeEventListener('error', this.errorHandler);
}

/** EVENT HANDLERS **/

SerialInterface.prototype.openHandler = function(){
	console.log("serial port open at "+this.baudRate+" on com "+this.comPort);
}
SerialInterface.prototype.dataHandler = function(data){
	console.log('got it ! ' + data);
}
SerialInterface.prototype.closeHandler = function(){
	console.lof("serial port closed :"+this.comPort);
}
SerialInterface.prototype.errorHandler = function(err){
	console.log("serial port error"+ err);
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

module.exports = SerialInterface;