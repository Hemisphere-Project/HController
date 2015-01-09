{
  "name": "video control button",
  "type": "script",
  "xml":"",
  "codejs": "onDigitalChange(\"IO0\",function(v){\n  if (v == 1) {\n    print('oui');resumeMedia();\n  } else if (v == 0) {\n    print('non');pauseMedia();\n  }\n});\n",
  "codepy": ""
}
