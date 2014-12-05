function MediaPlayerController(element){
	this.currentPlayerStatus = {
			isPlaying : false,
			media : null,
			isPaused : false,
			idStoped : false,
			isMuted : false,
			volume : 0,
			zoom : 0,
			blur: 0
	}
	this.element = element // more jQuery object than dom element
}


MediaPlayerController.prototype.updateWithPlayerStatus = function(status){
		
	if(status.isPlaying){
		///CCC
		//var statusMedia = currentMediaList[mediaIndexFromPath(status.media.filepath)];
	
		if(!this.currentPlayerStatus.isPlaying ){
			this.element.find('#play-btn').removeClass("btn-primary");
			this.element.find('#play-btn').addClass("btn-warning");
			
			this.element.find('#pause-btn').removeClass("disabled");
			
			//if(selectedMedia !== statusMedia)//CCC
				//selectMedia(statusMedia);//CCC

			//CCC
			//$(selectedMedia.element).append('<div id="play-info"><div class="progress" ><div class="progress-bar" style="width:'+100*status.media.progress/status.media.duration+'%;"></div></div></div>');

			
		}else{
			if(false/*selectedMedia !== statusMedia*/){
				//this.element.find("#play-info").remove();
				//selectMedia(statusMedia);//CCC
				//CCC
				//$(selectedMedia.element).append('<div id="play-info"><div class="progress" ><div class="progress-bar" style="width:'+100*status.media.progress/status.media.duration+'%;"></div></div></div>');
			}else{
				// update progress
				this.element.find(".progress-bar").css('width',100*status.media.progress/status.media.duration+'%');
			}
		}
		
	}else{
		if(this.currentPlayerStatus.isPlaying){
			this.element.find('#play-btn').addClass("btn-primary");
			this.element.find('#play-btn').removeClass("btn-warning");
			
			this.element.find('#pause-btn').addClass("disabled");
			
			//remove things
			//this.element.find("#play-info").remove();
		}
	}
	if(status.isPaused){
		if(!this.currentPlayerStatus.isPaused){
			this.element.find('#pause-btn').removeClass("btn-primary");
			this.element.find('#pause-btn').addClass("btn-warning");
		}
	}else{
		if(this.currentPlayerStatus.isPaused){
			this.element.find('#pause-btn').addClass("btn-primary");
			this.element.find('#pause-btn').removeClass("btn-warning");
		}			
	}
	if(status.isMuted){
		if(!this.currentPlayerStatus.isMuted){
			this.element.find('#mute-btn').removeClass("btn-primary");
			this.element.find('#mute-btn').addClass("btn-warning");
		}
	}else{
		if(this.currentPlayerStatus.isMuted){
			this.element.find('#mute-btn').addClass("btn-primary");
			this.element.find('#mute-btn').removeClass("btn-warning");
		}
	}
	if(status.loop){
		if(!this.currentPlayerStatus.loop){
			this.element.find('#loop-btn').removeClass("btn-primary");
			this.element.find('#loop-btn').addClass("btn-warning");
		}
	}else{
		if(this.currentPlayerStatus.loop){
			this.element.find('#loop-btn').addClass("btn-primary");
			this.element.find('#loop-btn').removeClass("btn-warning");
		}
	}
	if(status.volume !== this.currentPlayerStatus.volume){
		this.element.find("#volume-sli").slider("value",status.volume);
	}
	/*console.log(status.zoom);
	if(status.zoom !== currentPlayerStatus.zoom){
		$("#zoom_sli").slider("value",status.zoom);
	}
	if(status.blur !== currentPlayerStatus.blur){
		$("#blur_sli").slider("value",status.blur);
	}*/
	
	this.currentPlayerStatus = status;
}
