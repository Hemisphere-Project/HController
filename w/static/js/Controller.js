

function Controller(){
	
	 	if (!window.location.origin)
  			window.location.origin = window.location.protocol+"//"+window.location.host;
		this.socket = io.connect(window.location.origin);
	
		// media list in medias section
		//this.msMediaListController = new MediaListController($("#media-section .medialist"));
		
		//media player
		this.mediaPlayer = new MediaPlayerController(this.socket,$("#media-player #player-controls"),$("#media-player .media-list"));
		
		


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
		self.mediaPlayer.mediaList.populateMediaList(list);
			console.log(list);
	});
	
}
	
	

