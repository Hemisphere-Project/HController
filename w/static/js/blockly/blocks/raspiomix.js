//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#
Blockly.Blocks['readanalog'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Lis Capteur Analogique");
    this.appendDummyInput()
        .appendField("dans variable :")
        .appendField(new Blockly.FieldVariable("valeur"), "VAR");
    this.appendDummyInput()
        .appendField("Cannal")
        .appendField(new Blockly.FieldDropdown([["AN0", "0"], ["AN1", "1"], ["AN2", "2"], ["AN3", "3"]]), "channel");
    this.appendStatementInput("callback");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  /**
   * Add menu option to create getter block for loop variable.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
/*  customContextMenu: function(options) {
    if (!this.isCollapsed()) {
      var option = {enabled: true};
      var name = this.getFieldValue('VAR');
      option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
      var xmlField = goog.dom.createDom('field', null, name);
      xmlField.setAttribute('name', 'VAR');
      var xmlBlock = goog.dom.createDom('block', null, xmlField);
      xmlBlock.setAttribute('type', 'variables_get');
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
    }
  }*/
};

Blockly.Blocks['onAnalog'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(285);
    this.appendValueInput("what")
        .setCheck("Number")
        .appendField("10 +");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};
