function MediaListController(tableElement){
		this.currentMediaList = [];
		this.selectedMedia = {
			name :"",
			path : "",
			element:null
		}
		this.table = tableElement; // actually jquery obj more than dom element
}

MediaListController.prototype.selectMedia = function(media){
	
	if(this.currentMediaList.length === 0)
		return;

	if(!this.selectedMedia.element){
		$(media.element).addClass("active")
	}else if(media.element.id !== this.selectedMedia.element.id){
		$(media.element).addClass("active");
		$(this.selectedMedia.element).removeClass("active");
	}else{
		return;
	}
	this.selectedMedia = media;		
}


MediaListController.prototype.populateMediaList = function(list){
	
	// we do it the hard way for the moment :
	this.currentMediaList = [];
	this.table.children("tbody").text("");
	
	this.table.children("tbody").append('');
	list.forEach(function(file){
		this.table.children("tbody").append('<tr><td><span class="glyphicon glyphicon-film"></span></td><td>'+file.filename+'</td><td>55:02</td><td>773 Mo</td></tr>');
		var media = {
				name :file.filename,
				path :file.filepath,
				element:$('#mediaList a:last-child').get(0)
		}
		this.currentMediaList.push(media);
	});
	
	this.table.children("tbody").children().uniqueId();
	
	if(!this.selectedMedia.element && this.currentMediaList.length > 0)
		selectMedia(this.currentMediaList[0]);
}


MediaListController.prototype.mediaIndex = function(media){
	var k = 0;
	while(k<this.currentMediaList.length && this.currentMediaList[k].element.id != media.element.id)
		k++;
	if(k<this.currentMediaList.length)
		return k;
	else
		return null;
}

MediaListController.prototype.mediaIndexFromPath = function(filepath){
	var k = 0;
	while(k<this.currentMediaList.length && this.currentMediaList[k].path != filepath)
		k++;
	if(k<this.currentMediaList.length)
		return k;
	else
		return null;
}
