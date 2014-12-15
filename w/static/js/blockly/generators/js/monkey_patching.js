
Blockly.JavaScript['controls_repeat_forever'] = function(block) {
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = 'while (true) {\n' + branch + '\n}';
  return code;
};
