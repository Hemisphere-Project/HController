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
  	

About config
-------------

Here is a brief description of the globalconfig.json parameters. You can change them at your convinience.
```
ModuleManager
	.playlistAutoLaunch (true|false) Do we launch HPlayer in playlist mode
MediaManager
	.mediaDir (pathToDir) Path to the directory where the media are stored
	.USBDir (pathToDir) Path the USB directory where there's media you want to copy (typically /media/usb for the latest drive mounted with usbmount)
OSCInterface (obj) Parameter of the OSCInterface
RemoteInterface (?) Nothing here. Will welcome parameters for a remote control if the feature is developped sometime 
WebServer
	.root_dir (pathToDir) path to the web root dir, often named www...
	.port (int) the port used by webserver
	.refreshStatusPeriod (int) how often we query the HPlayer for status upade (in ms)
	
ProcessManager
	.HPlayerPath (pathToBin) location of the HPlayer binary
HPlayer (obj) default parameters of the HPlayer
SerialInterface
	.baudRate (int) We use serial to communicate with an arduino board sometime..

IcePicker (obj) Some creepy watchdog who kills HPlayer when frozen. Will be removed upon lake placid of full stability.
```
		
Credits
------------- 

HController is developped by the Hemisphere-Project Team

    ++ Thomas Bohl ++
    ++ Alain Barthelemy ++
    ++ Jeremie Forge ++
  
