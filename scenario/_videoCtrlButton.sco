{
  "name": "video control button",
  "type": "script",
  "xml":"",
  "codejs": "playMediaLoop('/home/pi/media/zintel_trailer-720p.mp4');onDigitalChange(\"IO0\",function(v){\n  if (v == 0) {\n    print('oui');resumeMedia();\n  } else if (v == 1) {\n    print('non');pauseMedia();\n  }\n});\n",
  "codepy": ""
}
