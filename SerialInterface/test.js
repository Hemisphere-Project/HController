var serialport = require("serialport");
var SerialPort = serialport.SerialPort
//var sstream = new sps.Serial('/dev/tty.usbmodemfa131',baud = 9600);
var serialPort = new SerialPort("/dev/tty.usbmodemfa131", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
},false);
serialPort.open(function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  /*serialPort.write("ls\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });*/
});