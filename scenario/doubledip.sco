{
  "name": "double dip",
  "type": "block",
  "xml": "<block type=\"ondigitalchange\" id=\"1\" x=\"74\" y=\"72\"><field name=\"channel\">DIP0</field><field name=\"VAR\">v</field><statement name=\"callback\"><block type=\"variables_set\" id=\"99\" inline=\"true\"><field name=\"VAR\">dip0</field><value name=\"VALUE\"><block type=\"variables_get\" id=\"108\"><field name=\"VAR\">v</field></block></value><next><block type=\"procedures_callnoreturn\" id=\"124\"><mutation name=\"dacpasdac\"></mutation></block></next></block></statement></block><block type=\"procedures_defnoreturn\" id=\"114\" x=\"506\" y=\"75\"><mutation></mutation><field name=\"NAME\">dacpasdac</field><statement name=\"STACK\"><block type=\"controls_if\" id=\"132\" inline=\"false\"><mutation else=\"1\"></mutation><value name=\"IF0\"><block type=\"logic_compare\" id=\"180\" inline=\"true\"><field name=\"OP\">EQ</field><value name=\"A\"><block type=\"variables_get\" id=\"85\"><field name=\"VAR\">dip0</field></block></value><value name=\"B\"><block type=\"variables_get\" id=\"90\"><field name=\"VAR\">dip1</field></block></value></block></value><statement name=\"DO0\"><block type=\"text_print\" id=\"170\" inline=\"false\"><value name=\"TEXT\"><block type=\"text\" id=\"153\"><field name=\"TEXT\">d'accord</field></block></value></block></statement><statement name=\"ELSE\"><block type=\"text_print\" id=\"171\" inline=\"false\"><value name=\"TEXT\"><block type=\"text\" id=\"172\"><field name=\"TEXT\">pas d'accord</field></block></value></block></statement></block></statement></block><block type=\"ondigitalchange\" id=\"4\" x=\"85\" y=\"193\"><field name=\"channel\">DIP1</field><field name=\"VAR\">v</field><statement name=\"callback\"><block type=\"variables_set\" id=\"109\" inline=\"true\"><field name=\"VAR\">dip1</field><value name=\"VALUE\"><block type=\"variables_get\" id=\"110\"><field name=\"VAR\">v</field></block></value><next><block type=\"procedures_callnoreturn\" id=\"119\"><mutation name=\"dacpasdac\"></mutation></block></next></block></statement></block>",
  "codejs": "var v;\nvar dip0;\nvar dip1;\n\nfunction dacpasdac() {\n  if (dip0 == dip1) {\n    print('d\\'accord');\n  } else {\n    print('pas d\\'accord');\n  }\n}\n\n\nonDigitalChange(\"DIP0\",function(v){\n  dip0 = v;\n  dacpasdac();\n});\n\nonDigitalChange(\"DIP1\",function(v){\n  dip1 = v;\n  dacpasdac();\n});\n",
  "codepy": ""
}