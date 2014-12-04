

function Controller(){
	
		// media list in media player section
		this.mpMediaListController = new MediaListController($("#media-player .medialist"));
		// media list in medias section
		//this.msMediaListController = new MediaListController($("#media-section .medialist"));
		
		//media player
		this.mediaPlayer = new MediaPlayerController($("#media-player #player-controls"));
		
 		if (!window.location.origin)
  			window.location.origin = window.location.protocol+"//"+window.location.host;
		this.socket = io.connect(window.location.origin);
		//var socket = io.connect('http://localhost:8080');
		

		this.addEventListeners();

}

Controller.prototype.addEventListeners = function(){
	
	this.socket.on('playerStatus', function (status) {
		$('#player-head player-name').text(status.name);
		this.mediaPlayer.updateWithPlayerStatus(status);
		console.log(status);
	});
	
	this.socket.on('mediaList', function (list) {
		this.mpMediaListController.populateMediaList(list);
			//console.log(list);
	});
	
}
	
	
		/*$('#play_btn').click(function () {
			if(!currentPlayerStatus.isPlaying && selectedMedia.element !== null)
				socket.emit('play',selectedMedia.path);
		});
		$('#prev_btn').click(function () {
			var prev = $(selectedMedia.element).prev();
			if(prev.get(0) === undefined)
				prev = $('.mediaElement').last();
					
			if(currentPlayerStatus.isPlaying){
				socket.emit('prev');
			}else{
				//selectMedia({media:prev.text(),element:prev.get(0)});
				selectMedia(currentMediaList[mediaIndex({name:"",path:"",element:prev.get(0)})]);
			}
		});
		$('#next_btn').click(function () {
			var next = $(selectedMedia.element).next();
			if(next.get(0) === undefined)
				next = $('.mediaElement').first();
					
			if(currentPlayerStatus.isPlaying){
				socket.emit('next');
			}else{
				//selectMedia({media:next.text(),element:next.get(0)});
				selectMedia(currentMediaList[mediaIndex({name:"",path:"",element:next.get(0)})]);
			}
		});
		$('#pause_btn').click(function () {
			if(!currentPlayerStatus.isPaused)
				socket.emit('pause');
			else
				socket.emit('resume');
				
		});
		$('#stop_btn').click(function () {
			if(!currentPlayerStatus.isStoped)
				socket.emit('stop');
		});
		$('#mute_btn').click(function () {
			if(currentPlayerStatus.isMuted)
				socket.emit('unmute');
			else
				socket.emit('mute');
		});
		$('#loop_btn').click(function () {
			if(currentPlayerStatus.loop)
				socket.emit('unloop');
			else
				socket.emit('loop');
		});
		$('#quit_btn').click(function () {
				socket.emit('quit');
		});
		$("#volume_sli").on( "slide", function( event, ui ) {
			socket.emit('volume',ui.value);
		});
		$("#zoom_sli").on( "slide", function( event, ui ) {
			socket.emit('zoom',ui.value);
		});
		$("#blur_sli").on( "slide", function( event, ui ) {
			socket.emit('blur',ui.value);
		});*/
		/*$(".mediaElement").live('click',function (event) {
			//selectMedia({media : $(event.currentTarget).text(),	element : event.currentTarget});
			if(currentPlayerStatus.isPlaying){
				// just do something
				socket.emit('play',currentMediaList[mediaIndex({name:"",path:"",element:event.currentTarget})].path);
			}else{
				selectMedia(currentMediaList[mediaIndex({name:"",path:"",element:event.currentTarget})]);
			}
		});*/
		
		
		

