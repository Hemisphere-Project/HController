function ScenarioListController(element){
		this.currentScenarioList = [];
		this.selectedScenario = {
			name :"",
			element:null
		}
		this.listElement = element; // actually jquery obj more than dom element
}

ScenarioListController.prototype.selectScenario = function(scenario){
	
	if(this.currentScenarioList.length === 0)
		return;

	this.selectedScenario = scenario;		
}


ScenarioListController.prototype.populateScenarioList = function(list){
	
	this.currentScenarioList = [];
	this.listElement.find(".divider").nextAll().remove();
	
	var self = this;
	list.forEach(function(file){
		self.listElement.append('<li><a href="#"><span class="glyphicon glyphicon-th-list"></span>'+file.filename+'</a></li>');
		var scenario = {
				name :file.filename,
				element:self.listElement.find("li:last").get(0)
		}
		self.currentScenarioList.push(scenario);

	});
	
	this.listElement.find(".divider").nextAll().uniqueId();
	
}

