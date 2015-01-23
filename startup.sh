#!/bin/bash

forever start WebServer/WebServer.js
forever start OSCDispatcher/OSCDispatcher.js
forever start ScenarioPlayer/init.js
sudo forever start IOInterface/IOInterface.js
bin/HPlayer/bin/HPlayer