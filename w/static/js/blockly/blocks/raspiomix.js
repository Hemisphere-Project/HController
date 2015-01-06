//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#
Blockly.Blocks['readanalog'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Lis Capteur Analogique");
    this.appendDummyInput()
        .appendField("dans variable :")
        .appendField(new Blockly.FieldVariable("v"), "VAR");
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
  }
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

Blockly.Blocks['onanalog'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Ecoute Capteur Analogique");
    this.appendDummyInput()
        .appendField("dans variable :")
        .appendField(new Blockly.FieldVariable("v"), "VAR");
    this.appendDummyInput()
        .appendField("Cannal")
        .appendField(new Blockly.FieldDropdown([["AN0", "0"], ["AN1", "1"], ["AN2", "2"], ["AN3", "3"]]), "channel");
    this.appendStatementInput("callback");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip('');
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks['readdigital'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Lis Capteur Numérique");
    this.appendDummyInput()
        .appendField("dans variable :")
        .appendField(new Blockly.FieldVariable("v"), "VAR");
    this.appendDummyInput()
        .appendField("Cannal")
        .appendField(new Blockly.FieldDropdown([["IO0", "IO0"], ["IO1", "IO1"], ["IO2", "IO2"], ["IO3", "IO3"], ["DIP0", "DIP0"], ["DIP1", "DIP1"]]), "channel");
    this.appendStatementInput("callback");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks['ondigital'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Ecoute Capteur Numérique");
    this.appendDummyInput()
        .appendField("dans variable :")
        .appendField(new Blockly.FieldVariable("v"), "VAR");
    this.appendDummyInput()
        .appendField("Cannal")
        .appendField(new Blockly.FieldDropdown([["IO0", "IO0"], ["IO1", "IO1"], ["IO2", "IO2"], ["IO3", "IO3"], ["DIP0", "DIP0"], ["DIP1", "DIP1"]]), "channel");
    this.appendStatementInput("callback");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip('');
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks['ondigitalchange'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Ecoute Changement");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["IO0", "IO0"], ["IO1", "IO1"], ["IO2", "IO2"], ["IO3", "IO3"], ["DIP0", "DIP0"], ["DIP1", "DIP1"]]), "channel");
    this.appendDummyInput()
        .appendField("dans variable :")
        .appendField(new Blockly.FieldVariable("v"), "VAR");   
    this.appendStatementInput("callback");
    this.setInputsInline(true);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip('');
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};
