var ProcessManager 	= require('./ProcessManager/ProcessManager.js');
pm = new ProcessManager();

pm.cleanZombies('HPlayer');
pm.spawn("./bin/HPlayer/bin/HPlayer",[],true,false);

//pm.spawn("node",["./ScenarioPlayer/init.js"],true,true);
pm.spawn("node",["./OSCDispatcher/OSCDispatcher.js"],true,false);
pm.spawn("node",["./WebServer/WebServer.js"],true,false);
pm.spawn("sudo",["node","./IOInterface/IOInterface.js"],true,false);


process.on('SIGINT', gameover);
process.on('uncaughtException', gameover);
process.on('exit', gameover);
function gameover(code){
	pm.cleanZombies('HPlayer');
	pm.cleanZombies('node');
	//pm.killAll();
	//process.exit(0);
}