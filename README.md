```
 __  __   ______   ______   __   __   ______  ______   ______   __       __       ______   ______   
/\ \_\ \ /\  ___\ /\  __ \ /\ "-.\ \ /\__  _\/\  == \ /\  __ \ /\ \     /\ \     /\  ___\ /\  == \  
\ \  __ \\ \ \____\ \ \/\ \\ \ \-.  \\/_/\ \/\ \  __< \ \ \/\ \\ \ \____\ \ \____\ \  __\ \ \  __<  
 \ \_\ \_\\ \_____\\ \_____\\ \_\\"\_\  \ \_\ \ \_\ \_\\ \_____\\ \_____\\ \_____\\ \_____\\ \_\ \_\
  \/_/\/_/ \/_____/ \/_____/ \/_/ \/_/   \/_/  \/_/ /_/ \/_____/ \/_____/ \/_____/ \/_____/ \/_/ /_/
  
```
  

Description
------------- 
  
	HController is a media controller designed to work with HPlayer.
  
Installation 
------------- 

  1. install node.js 
  	
  	# create a node directory and download the last arm distribution 
  	in this directory
  	
		cd /home/pi
  		mkdir node
  		cd ./node
  		wget http://node-arm.herokuapp.com/node_latest_armhf.deb
  		
  	# Install the downloaded package
  		
  		sudo dpkg -i node_latest_armhf.deb
  	
  	# Once the package installed you should be able to run node typing "node" 
  	and execute a console.log("hello baby") in interactive mode
  	
  2. clone HController from GitHub
  
  	cd /home/pi
  	git clone https://github.com/hemisphere-code/HController.git
  	
  3. Get Started :
  
  	cd HController
  	node HController.js
  	
  	
#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#  
#* OSC Messages #*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#
#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#*#

---- To the HPlayer ----

/PlayerName
	└── /play ["file path"]
	└── /pause 
	└── /stop 
	└── /resume
	└── /volume [50] #int value 0-100
	└── /mute
	└── /unmute
	└── /fx
		└── /gaussianBlur [5]
	└── /s
		└── /getStatus
			  
---- From the HPlayer ----

/PlayerName
		└── /status ["name"] ["playing / paused / stoped"] ["file path"] [1273] [5555555] [volume] ["muted / unmuted"] 
		└── /end ["file path"]
		
		
  
