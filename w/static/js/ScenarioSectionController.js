function ScenarioSectionController(socket,element,scenarioListElement){
	
	this.element = element // more jQuery object than dom element
	
	this.scenarioList = new ScenarioListController(scenarioListElement);
	
	this.socket = socket;
	
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
	});
	this.element.find('#delete-scenario-btn').click(function () {
	});
	this.element.find('#upload-scenario-btn').click(function () {
	});
	this.element.find('#download-scenario-btn').click(function () {
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

ScenarioSectionController.prototype.loadScenario = function(){
	
}
ScenarioSectionController.prototype.playScenario = function(){
	
}
ScenarioSectionController.prototype.stopScenario = function(){
	
}
ScenarioSectionController.prototype.saveScenario = function(){
	
}
ScenarioSectionController.prototype.deleteScenario = function(){
	
}
ScenarioSectionController.prototype.uploadScenario = function(){
	
}
ScenarioSectionController.prototype.downloadScenario = function(){
	
}
