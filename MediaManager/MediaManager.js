var fs = require('fs'),
	path = require('path'),
	prompt = require('prompt'),
	progress = require('progress-stream');
	
var DEFAULT_MEDIA_DIR = path.join(__dirname, '../media');
var DEFAULT_USB_DIR = '/media/usb0';

var SUPPORTED_MEDIA_EXT = [".mov",".avi",".mp4",".MOV",".AVI",".MP4",".mp3",".MP3"];

var YNPromptProperty = {
  name: 'yesno',
  message: 'are you sure?',
  validator: /y[es]*|n[o]?/,
  warning: 'Must respond yes or no',

};


function MediaManager(mediaDir,USBDir){
	this.mediaDirectory = typeof mediaDir !== 'undefined' ? path.resolve(__dirname,"../",mediaDir) : DEFAULT_MEDIA_DIR;
	this.USBDirectory = typeof USBDir !== 'undefined' ? USBDir : DEFAULT_USB_DIR;

	//this.updateMediaList()
}

MediaManager.prototype.updateMediaList = function(){
	var self = this;
	this.listMedia(this.mediaDirectory,function(err,data){
			if(err)
				return console.log(err);
				
			self.mediaList = data;
	});//temporary	
}

// list every media of a directory 
MediaManager.prototype.listMedia = function(dir,callback){
	fs.readdir(dir,function(err,list){
		if(err)
			return callback(err);
		
		var retList = new Array();
		for(var k = 0;k<list.length;k++){
			var ext = path.extname(list[k]);
			for(var l=0;l<SUPPORTED_MEDIA_EXT.length;l++){
				if(ext === SUPPORTED_MEDIA_EXT[l]){
					//temporary
					retList.push({filename:list[k],filepath:path.join(dir,list[k])});
				}
			}
		}
		return callback(null,retList);
		
				
	});
}
// list every media of a directory recursively
MediaManager.prototype.listMediaRecursive = function(dir,callback){
	var self = this;
	var retList = [];
	fs.readdir(dir, function(err, list){
		if (err) 
			return callback(err);
		
		var pending = list.length;
		if (!pending) 
			return callback(null, retList);
		
		list.forEach(function(file){
				
				file = path.resolve(dir, file);
				
				fs.stat(file, function(err, stat) {
						if (stat && stat.isDirectory()) {
							self.listMediaRecursive(file, function(err, res) {
									retList = retList.concat(res);
									if (!--pending) callback(null, retList);
							});
						}else{
							var ext = path.extname(file);
							for(var k=0;k<SUPPORTED_MEDIA_EXT.length;k++){
								if(ext === SUPPORTED_MEDIA_EXT[k]){
									retList.push(file);
								}
							}
							if (!--pending) callback(null, retList);
						}
				});
		});
  });
	
}

MediaManager.prototype.copyMedia = function(media,from,to,callback){
	
	if(!fs.existsSync(from))
		return callback(from+" directory doesn't exists");
	if(!fs.existsSync(to))
		return callback(to+" directory doesn't exists");
	if(!fs.existsSync(path.join(from,media)))
		return callback(media+" doesn't exists in "+from);
	if(fs.existsSync(path.join(to,media)))
		return callback(media+' already exists in '+to);


	
	var is = fs.createReadStream(path.join(from,media));
    var os = fs.createWriteStream(path.join(to,media));
	
    var inStream = fs.createReadStream(path.join(from,media));
    var outStream = fs.createWriteStream(path.join(to,media));
    
    inStream.on('open', function () {
    		
			var stat = fs.statSync(path.join(from,media));
			var str = progress({
				length: stat.size,
				time: 100
			});
			
			str.on('progress', function(progress) {
					process.stdout.clearLine();  // clear current text
					process.stdout.cursorTo(0);
					process.stdout.write(progress.transferred+" / "+progress.length+" ("+progress.percentage+" %) transferred");
			});
			
    		inStream.pipe(str).pipe(outStream);
    		inStream.on('end',function(){
    			return callback(null,'\n'+path.join(from,media)+'\n copied to \n'+path.join(to,media));		
    		});
    		//outStream.end();
    		
    });

    inStream.on('error', function(err) {
    	return callback(err);
    });
    
    outStream.on('error', function(err) {
    	return callback(err);
    });
	
}
MediaManager.prototype.deleteMedia = function(media,callback){
	
}
MediaManager.prototype.renameMedia = function(media,name,callback){
	
}
MediaManager.prototype.loadFromUSBStorage = function(callback){
	var self = this;
	
	console.log(fs.statSync(this.USBDirectory));
	
	if(!fs.existsSync(this.USBDirectory))
		return console.log("usb directory not found");
	if(fs.statSync(this.USBDirectory).size == 0)
		return console.log("usb directory empty or drive not mounted");
	
	this.listMediaRecursive(this.USBDirectory,function(err,list){
		if(err)
			return console.log(err);
		
		list.forEach(function(element){
			self.copyMedia(element,self.USBDirectory,self.mediaDirectory,function(err,message){
				if(err)
					return console.log(err)
				
				console.log(message);
			
			});
		/*prompt.start();
		YNPromptProperty.message = "Do you want to copy "+list.length+" media from USB storage ? (y|n)\n\n";
		prompt.get(YNPromptProperty, function (err, result) {
			if(err)
				return console.log(err);
			
			if(result.yesno === "yes" || result.yesno === "y"){
				list.forEach(function(element){
				self.copyMedia(element,self.USBDirectory,self.mediaDirectory,function(err,message){
					if(err)
						return console.log(err)
					
					console.log(message);
					});
			}); 
		  	  
		  }*/
		});
		return callback();		
	});
	
}

module.exports = MediaManager;