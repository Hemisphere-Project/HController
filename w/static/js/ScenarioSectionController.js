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
	Code.saveScenario();
}
ScenarioSectionController.prototype.deleteScenario = function(){
	
}
ScenarioSectionController.prototype.uploadScenario = function(){
	
}
ScenarioSectionController.prototype.downloadScenario = function(){
	
}
