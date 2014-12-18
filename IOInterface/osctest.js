var osc = require('node-osc');

var oscClient = new osc.Client("127.0.0.1", 6001); 
oscClient.sendMessage = function (operation,args){
		var message = new osc.Message('raspiomix/'+operation);
		if(typeof args !== 'undefined')// we got args
			for(var k=0;k<args.length;k++)// we push args
				message.append(args[k]);
	console.log(JSON.stringify(message)+"  "+args);
		this.send(message);	
}


var oscServer = new osc.Server(6000, "127.0.0.1");

oscServer.on("message", function(message,rinfo){
		console.log(message);
		console.log(rinfo);
});	
	
	
	
oscClient.sendMessage("getAnalog",[0,"salut",3.45]);
