{
  "name": "digital handler",
  "type": "block",
  "xml": "<block type=\"ondigital\" id=\"4\" x=\"184\" y=\"57\"><field name=\"VAR\">v</field><field name=\"channel\">IO0</field><statement name=\"callback\"><block type=\"controls_if\" id=\"5\" inline=\"false\"><value name=\"IF0\"><block type=\"logic_compare\" id=\"6\" inline=\"true\"><field name=\"OP\">EQ</field><value name=\"A\"><block type=\"variables_get\" id=\"7\"><field name=\"VAR\">v</field></block></value><value name=\"B\"><block type=\"math_number\" id=\"8\"><field name=\"NUM\">1</field></block></value></block></value><statement name=\"DO0\"><block type=\"text_print\" id=\"9\" inline=\"false\"><value name=\"TEXT\"><block type=\"text\" id=\"10\"><field name=\"TEXT\">Bouton appuyé !</field></block></value></block></statement></block></statement></block>",
  "codejs": "var v;\n\n\nonDigital(\"IO0\",function(v){\n  if (v == 1) {\n    print('Bouton appuyé !');\n  }\n});\n",
  "codepy": ""
}