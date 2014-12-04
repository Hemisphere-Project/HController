function GUI(){

	this.states = {
				scenarios:'scenarios', 
				controls:'controls', 
				medias:'medias', 
				settings:'settings'
	};
	
	// initialize the current state
	this.changeState(this.states.medias);
	
	this.addEventListeners();
	
	//initialize jquery-ui components
	$("#volume_sli").slider({
			min: 0,
			max: 100,
			value: 50,
			orientation: "horizontal",
			range: "min"
	});
	$( "#controls-accordion" ).accordion({
      heightStyle: "fill",
      header: ".panel-heading",
      collapsible: true,
      animate:{easing:"easeOutExpo",duration:300},
      active:false
   });
  
  $( window ).resize(function() {
  		$( "#controls-accordion" ).accordion( "refresh" );
  });

	

	
}

GUI.prototype.addEventListeners = function(){
	console.log($(".nav-btn"));
/*	$(".nav-btn").each(function(element){
			$(this).on("click",navclick(event));
	});*/
	$(document).on('click', '.nav-btn', function(event){
			navclick(event);
	});
	var scope = this
	function navclick(event){
		switch(event.currentTarget.id){
			case "nav-btn-scenarios" : 
				console.log("ok");
				scope.changeState(scope.states.scenarios);
				break;
			case "nav-btn-controls" : 
				scope.changeState(scope.states.controls);
				// only necessary when first load controls
				$( "#controls-accordion" ).accordion( "refresh" );
				break;
			case "nav-btn-medias" : 
				scope.changeState(scope.states.medias);
				break;
			case "nav-btn-settings" : 
				scope.changeState(scope.states.settings);
				break;
		}
	}
}

GUI.prototype.changeState = function(newState){
	
	if(newState == this.currentState || !(newState in this.states))
		return;
	
	$(".content-section").each(function(section,index){
			$(".content-section").addClass("hidden");
			$(".nav-btn").removeClass("active");
	});
	
	switch(newState){
		case this.states.scenarios :
			$("#scenario-section").removeClass("hidden");
			$("#nav-btn-scenarios").addClass("active");
			break;
		case this.states.controls :
			$("#controls-section").removeClass("hidden");
			$("#nav-btn-controls").addClass("active");
			break;
		case this.states.medias :
			$("#medias-section").removeClass("hidden");
			$("#nav-btn-medias").addClass("active");
			break;
		case this.states.settings :
			$("#settings-section").removeClass("hidden");
			$("#nav-btn-settings").addClass("active");
			break;
		default : console.log("unknown state"); break;
		
	}
	
	this.currentState = newState;
	
}