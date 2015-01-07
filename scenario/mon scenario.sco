{
  "name": "mon scenario",
  "type": "block",
  "xml": "<block type=\"ondigitalchange\" id=\"13\" x=\"20\" y=\"72\"><field name=\"channel\">IO2</field><field name=\"VAR\">v</field><statement name=\"callback\"><block type=\"text_print\" id=\"14\" inline=\"false\"><value name=\"TEXT\"><block type=\"text\" id=\"15\"><field name=\"TEXT\">héhéhé</field></block></value></block></statement></block><block type=\"ondigitalchange\" id=\"10\" x=\"427\" y=\"83\"><field name=\"channel\">IO1</field><field name=\"VAR\">v</field><statement name=\"callback\"><block type=\"text_print\" id=\"11\" inline=\"false\"><value name=\"TEXT\"><block type=\"text\" id=\"12\"><field name=\"TEXT\">héhéhé</field></block></value></block></statement></block>",
  "codejs": "var v;\n\n\nonDigitalChange(\"IO2\",function(v){\n  print('héhéhé');\n});\n\nonDigitalChange(\"IO1\",function(v){\n  print('héhéhé');\n});\n",
  "codepy": ""
}