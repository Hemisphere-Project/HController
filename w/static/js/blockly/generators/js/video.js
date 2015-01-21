'use strict';

goog.provide('Blockly.Python.video');
goog.require('Blockly.Python');

Blockly.JavaScript['video_play'] = function(block) {
  var media = Blockly.Python.quote_(block.getTitleValue('VIDEO'));
  var code = 'playMedia(' + media + ');\n'

  return code;
};

/*Blockly.JavaScript['video_stop'] = function(block) {

  return 'stop_video()\n';
};*/
