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
  	
  	create a node directory and download the last arm distribution 
  	in this directory
  	
		cd /home/pi
  		mkdir node
  		cd ./node
  		wget http://node-arm.herokuapp.com/node_latest_armhf.deb
  		
  	Install the downloaded package
  		
  		sudo dpkg -i node_latest_armhf.deb
  	
  	Once the package installed you should be able to run node typing "node" 
  	and execute a console.log("hello baby") in interactive mode
  	
  2. clone HController from GitHub
  
  	cd /home/pi
  	git clone https://github.com/hemisphere-code/HController.git
  	
  3. Get Started :
  
  	cd HController
  	node HController.js
  	
  	
OSC Messages
------------- 

/play [<path1>] [<path2>] ...       : Play the file (or dir) list in order
/playloop [<path1>] [<path2>] ...   : Same as play with playlist loop
/volume <0:100>     : Set volume from 0 to 100
/blur <0:100>       : Set blur level from 0 to 100
/zoom <0:100>       : Set zoom from 0 to 100%
/stop           : Stop and rewind the current video file
/pause          : Pause the video file
/resume         : Resume the paused file
/next           : Play the next file in the list
/prev           : Play the previous file in the list
/mute           : Mute the sound of the video
/unmute         : Unmute the sound of the video
/loop           : Enable looping for the current playlist
/unloop         : Disable looping for the current playlist
/info           : Toggle media info window (disabled)
/quit           : Exit the player
		
Credits
------------- 

HController is developped by the Hemisphere-Project Team

    ++ Thomas Bohl ++
    ++ Alain Barthelemy ++
    ++ Jeremie Forge ++
  
