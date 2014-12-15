

function Controller(){
	
	 	if (!window.location.origin)
  			window.location.origin = window.location.protocol+"//"+window.location.host;
		this.socket = io.connect(window.location.origin);
	
		// media list in medias section
		//this.msMediaListController = new MediaListController($("#media-section .medialist"));
		
		//media player
		this.mediaPlayer = new MediaPlayerController(this.socket,$("#media-player #player-controls"),$("#media-player .media-list"));
		
		this.mediaSection = new MediaSectionController(this.socket,$("#media-section"),$("#media-section .media-list"));	

		this.scenarioSection = new ScenarioSectionController(this.socket,$("#scenario-section"),$("#scenario-section #scenario-dd"))
		
		this.addEventListeners();

}

Controller.prototype.addEventListeners = function(){
	
	var self = this;
	this.socket.on('connect', function (data) {
			console.log('connected');
	});
	
	this.socket.on('playerStatus', function (status) {
		$('#player-head .player-name').text(status.name);
		self.mediaPlayer.updateWithPlayerStatus(status);
		console.log(status);
	});
	
	this.socket.on('mediaList', function (list) {
		self.mediaPlayer.updateMediaList(list);
		self.mediaSection.updateMediaList(list);
		self.scenarioSection.updateMediaList(list);
		//console.log(list);
	});
	
	this.socket.on('scenarioList', function (list) {
		console.log(list);
		self.scenarioSection.updateScenarioList(list);
	});
	this.socket.on('scenario', function (scenario) {
		console.log(scenario);
		self.scenarioSection.updateCurrentScenario(scenario);
	});
	
}
	
	

