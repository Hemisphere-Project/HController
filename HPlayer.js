
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
	this.zoom 		= 100;
	this.blur 		= 0;
	this.hdmiAudio	= false;
	this.glsl		= false;
	this.info		= false;
	
	if (config)
	{ 
		this.status(config);
		this.hdmiAudio	= config.hdmiAudio;
		this.glsl		= config.glsl;
		this.info		= config.info;
	}
}

HPlayer.prototype.status = function(status){
	
	if(typeof status !== 'undefined')
	{
		this.name = status.name;
		this.isPlaying = status.isPlaying;
		this.media = status.media;
		this.isPaused = status.isPaused;
		this.isMuted = status.isMuted;
		this.volume = status.volume;
		this.zoom = status.zoom;
		this.blur = status.blur;
		this.loop = status.loop;
	}

	
	return {
		name : this.name,
		isPlaying : this.isPlaying,
		media : this.media,
		isPaused : this.isPaused,
		isMuted : this.isMuted,
		volume : this.volume,
		zoom : this.zoom,
		blur : this.blur,
		loop : this.loop,
		hdmiAudio : this.hdmiAudio,
		glsl : this.glsl,
		info : this.info
	}
		
}

module.exports = HPlayer;
