function ScenarioSectionController(socket,element,scenarioListElement){
	
	this.element = element // more jQuery object than dom element
	
	this.scenarioList = new ScenarioListController(scenarioListElement);
	
	this.socket = socket;
	
	this.currentScenario = {};
	
	this.addEventListeners();
}

ScenarioSectionController.prototype.addEventListeners = function(){
	
	var self = this;
	this.element.find('#add-scenario-btn').click(function () {
	});
	this.element.find('#play-scenario-btn').click(function () {
	});
	this.element.find('#stop-scenario-btn').click(function () {
	});
	this.element.find('#save-scenario-btn').click(function () {
			self.saveScenario();
	});
	this.element.find('#delete-scenario-btn').click(function () {
	});
	this.element.find('#upload-scenario-btn').click(function () {
	});
	this.element.find('#download-scenario-btn').click(function () {
	});
	$("#scenario-section").on('click','.scenario-dd-element',function (event) {
		self.scenarioList.selectScenario(self.scenarioList.getScenarioIndexFromElement(event.currentTarget));
		self.socket.emit('getScenario',self.scenarioList.selectedScenario.path);
	});
}

ScenarioSectionController.prototype.updateMediaList = function(list){
	Blockly.Medias.populateMediaList(list);
}

ScenarioSectionController.prototype.updateScenarioList = function(list){
	
	if( typeof list === 'undefined')
		return;
	
	this.scenarioList.populateScenarioList(list);
}

ScenarioSectionController.prototype.updateCurrentScenario = function(scenario){
	this.currentScenario = scenario;
	this.element.find("#scenario-dd-btn #current-sco-label").text(this.currentScenario.name);
	if(this.currentScenario.type == "block")
		this.updateBlockly();
}

ScenarioSectionController.prototype.updateBlockly = function(){
	
	if (Blockly.mainWorkspace !== null)
		Blockly.mainWorkspace.clear();
	
  var xml = Blockly.Xml.textToDom("<xml>"+this.currentScenario.xml+"</xml>")
  Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
}

ScenarioSectionController.prototype.playScenario = function(){
	
}
ScenarioSectionController.prototype.stopScenario = function(){
	
}
ScenarioSectionController.prototype.saveScenario = function(){
 
	//if (!Code.current_scenario || (Code.current_scenario.length == 0)) {
  //  return;
  //}

  this.currentScenario.xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()).innerHTML;
  //this.currentScenario.codepy = this.wrapPyScenario(Blockly.Python.workspaceToCode());
  this.currentScenario.codejs = Blockly.JavaScript.workspaceToCode();
  console.log(this.currentScenario);
  
  this.socket.emit('saveScenario',{scenariopath:this.scenarioList.selectedScenario.path,scenario:this.currentScenario});
}
// temporary
ScenarioSectionController.prototype.wrapPyScenario = function(code) {
  var lines = code.split('\n');

  code = "def run():";
  code += "\n";

  for(var i = 0; i < lines.length; i++) {
    code += "  " + lines[i] + "\n";
  }

  code += "\n";

  var tail = [
    '',
    'if __name__ == "__main__":',
    '  from griotte.config import Config',
    '  Config("DEFAULT")',
    '  run()',
    ].join('\n');

  code = code + tail;
  console.log(code);

  return code;
};

ScenarioSectionController.prototype.deleteScenario = function(){
	
}
ScenarioSectionController.prototype.uploadScenario = function(){
	
}
ScenarioSectionController.prototype.downloadScenario = function(){
	
}
