var Args = require("arg-parser"),
		fs = require('fs'),
		path = require('path'),
		vm = require('vm'),
		ScenarioAPI = require('./ScenarioAPI.js');

function ScenarioPlayer(){

	this.isPlaying = false;
	this.currentScenario = "";

	this.options = this.parseArgs();
	//console.log(this.options);
	if(this.options.input){
		var sco = this.openSCO(this.options.input);
		if(!sco)
			return;
		var script = vm.createScript(sco.code);
		this.play(script);
		
	}
	
}


ScenarioPlayer.prototype.parseArgs = function(){
	
	var args = new Args('Scenario Player', '0.0.1','\n','\n\n'); 
	args.add({ name: 'input', desc: 'input file', switches: [ '-i', '--input-file'], value: 'input', required:true });
	args.add({ name: 'verbose', desc: 'verbose mode', switches: [ '-V', '--verbose'] });
	//args.add({ name: 'text', desc: 'text to store', required: false });
	
	//if (args.parse()) console.log(args.params);
	args.parse();
	
	return {input:args.params.input}	
	
}

ScenarioPlayer.prototype.play = function(scenario){
	
	var context = vm.createContext(new ScenarioAPI());
	//context.print = function(what){console.log(what)};
	
	//console.log(scenario);
	
	scenario.runInContext(context);
	//scenario.runInThisContext();

}

ScenarioPlayer.prototype.pause = function(){
	
}

ScenarioPlayer.prototype.stop = function(){
	
}

ScenarioPlayer.prototype.openSCO = function(file){
	
	if(path.extname(file) != ".sco")
		return console.error("\x1B[31m input is not a .sco file\x1B[39m");
	
	var scoFile = fs.readFileSync(file);
	
	return JSON.parse(scoFile);
}


module.exports = ScenarioPlayer;


