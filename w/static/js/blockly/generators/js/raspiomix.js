Blockly.JavaScript['readanalog'] = function(block) {
  var dropdown_channel = block.getFieldValue('channel');
  var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
  var variable0 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = 'readAnalog('+dropdown_channel+',function('+variable0+'){\n'+statements_callback+'});\n';
  return code;
};

Blockly.JavaScript['onAnalog'] = function(block) {
  var value_what = Blockly.JavaScript.valueToCode(block, 'what', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = parseInt(value_what) + 10;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
