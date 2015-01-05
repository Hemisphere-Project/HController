function GUI(){

	this.states = {
				scenario:'scenario', 
				controls:'controls', 
				medias:'medias', 
				settings:'settings'
	};
	
	this.scenarioSubStates = {
			scenarioempty:'scenarioempty',
			scenarioloaded:'scenarioloaded'
	};
	
	// initialize the current state
	this.changeState(this.states.scenario);
	
	// initialize scenario section
	this.changeScenarioSubState(this.scenarioSubStates.scenarioempty);
	
	this.addEventListeners();
	
	//initialize jquery-ui components
	if ($("#volume-sli").length > 0) {
		$("#volume-sli").slider({
				min: 0,
				max: 100,
				value: 50,
				orientation: "horizontal",
				range: "min"
		});
	}
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
	//console.log($(".nav-btn"));
/*	$(".nav-btn").each(function(element){
			$(this).on("click",navclick(event));
	});*/
	
	var scope = this;
	
	$(document).on('click', '.nav-btn', function(event){
			navclick(event);
	});
	
	function navclick(event){
		switch(event.currentTarget.id){
			case "nav-btn-scenario" : 
				scope.changeState(scope.states.scenario);
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
		case this.states.scenario :
			$("#scenario-section").removeClass("hidden");
			$("#nav-btn-scenario").addClass("active");
			break;
		case this.states.controls :
			$("#controls-section").removeClass("hidden");
			$("#nav-btn-controls").addClass("active");
			break;
		case this.states.medias :
			$("#media-section").removeClass("hidden");
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

GUI.prototype.changeScenarioSubState = function(newScenarioSubState){
	if(newScenarioSubState == this.currentScenarioSubState || !(newScenarioSubState in this.scenarioSubStates))
		return;
	
	
	switch(newScenarioSubState){
		case this.scenarioSubStates.scenarioempty :
			$("#play-scenario-btn").addClass("disabled");
			$("#stop-scenario-btn").addClass("disabled");
			$("#save-scenario-btn").addClass("disabled");
			$("#delete-scenario-btn").addClass("disabled");
			$("#download-scenario-btn").addClass("disabled");
			break;
		case this.scenarioSubStates.scenarioloaded :
			$("#play-scenario-btn").removeClass("disabled");
			$("#stop-scenario-btn").removeClass("disabled");
			$("#save-scenario-btn").removeClass("disabled");
			$("#delete-scenario-btn").removeClass("disabled");
			$("#download-scenario-btn").removeClass("disabled");
			break;
		default : console.log("unknown sub state"); break;
		
	}
	
	this.currentSubState = newScenarioSubState;
}	
	
	
	