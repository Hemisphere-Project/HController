#!/bin/bash

forever start WebServer/WebServer.js
forever start OSCDispatcher/OSCDispatcher.js
forever start -o /home/pi/HController/ScenarioPlayer/ScenarioPlayer.log ScenarioPlayer/init.js
sudo forever start IOInterface/IOInterface.js
bin/HPlayer/bin/HPlayer &