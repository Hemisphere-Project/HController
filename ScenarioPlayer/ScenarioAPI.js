function ScenarioAPI(){
	
	this.print = function(what){
			console.log("\x1B[32m"+what+"\x1B[39m");
	}
	
}

module.exports = ScenarioAPI;
