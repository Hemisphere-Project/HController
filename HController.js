/* Main Controller of HP */

//TODO : base64 filepath
//TODO : Store player state reguraly into config
//TODO : autoload from usb storage
//TODO : Serial interface + patch

var ModuleManager = require('./ModuleManager');
var modules = new ModuleManager(); 

///////////////////////////////////////////////////////////
//START HCONTROLLER
//////////////////////////////////////////////////////////

modules.start();


///////////////////////////////////////////////////////////
//EXIT
//////////////////////////////////////////////////////////

function exit(code,err) {
    
	if (code == 2) console.log('Exit on SIGINT'.red);
	else if (code == 99) console.log('Exit on Uncaught Exception: '.red+err);
	
	modules.stop(code);
}

process.on('SIGINT', exit.bind(null,2)); //CTRL-C
process.on('uncaughtException', function (err) { exit(99,err); });








