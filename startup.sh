#!/bin/bash

forever start -o logs/Webserver.log WebServer/WebServer.js
forever start -o logs/OSCDispatcher.log OSCDispatcher/OSCDispatcher.js
forever start -o logs/ScenarioPlayer.log ScenarioPlayer/init.js
sudo forever start -o logs/IOInterface.log IOInterface/IOInterface.js
bin/HPlayer/bin/HPlayer &
