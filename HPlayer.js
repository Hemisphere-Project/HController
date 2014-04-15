
/***** HPlayer Model Class ****/


function HPlayer(){
	this.pid = null;
	this.name = "Roberto";
	this.isPlaying = false;
	this.media = {
		filepath:null,
		progress:null,
		duration:null
	}
	this.isPaused = false;
	this.isMuted = false;
	this.volume = 50;
}

HPlayer.prototype.status = function(status){
	
	if(typeof status !== 'undefined'){
		this.name = status.name;
		this.isPlaying = status.isPlaying;
		this.media = status.media;
		this.isPaused = status.isPaused;
		this.isMuted = status.isMuted;
		this.volume = status.volume;
	}

	
	return {
		name : this.name,
		isPlaying : this.isPlaying,
		media : this.media,
		isPaused : this.isPaused,
		isMuted : this.isMuted,
		volume : this.volume
	}
		
}

module.exports = HPlayer;
