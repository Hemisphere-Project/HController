
/***** HPlayer Model Class ****/

function HPlayer(config){

	this.pid 		= null;
	this.name 		= "Roberto";
	this.isPlaying 	= false;
	this.media = {
		filepath:	null,
		progress:	null,
		duration:	null
	}
	this.loop		= false;
	this.isPaused 	= false;
	this.isMuted 	= false;
	this.volume 	= 50;
	this.hdmiAudio	= false;
	this.glsl		= false;
	this.info		= false;
	
	if (config) this.status(config);
}

HPlayer.prototype.status = function(status){
	
	if(typeof status !== 'undefined'){
		this.name = status.name;
		this.isPlaying = status.isPlaying;
		this.media = status.media;
		this.isPaused = status.isPaused;
		this.isMuted = status.isMuted;
		this.volume = status.volume;
		this.loop = status.loop;
	}

	
	return {
		name : this.name,
		isPlaying : this.isPlaying,
		media : this.media,
		isPaused : this.isPaused,
		isMuted : this.isMuted,
		volume : this.volume,
		loop : this.loop
	}
		
}

module.exports = HPlayer;
