/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['javascript', 'python', 'dart', 'xml'];

Code.selected = 'javascript';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(MSG['badXml'].replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
      'visible';
  Code.renderContent();
  Blockly.fireUiEvent(window, 'resize');
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    var code = Blockly.JavaScript.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'js');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_python') {
    code = Blockly.Python.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'py');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_dart') {
    code = Blockly.Dart.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'dart');
      content.innerHTML = code;
    }
  }
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

Code.refresh_scenario_list = function() {
  var $sel = $("#select-scenario");
  var scenarii = Blockly.Medias.getMediasFor('scenario');

  console.log(scenarii);

  console.log("Emptying list");
  console.log($sel);

  $sel.find('option').remove();
  $sel.append('<option data-placeholder="true">' + Blockly.Msg.OPEN_SCENARIO + "</option>");
  for(var i = 0; i < scenarii.length; i++) {
    $sel.append("<option value=" + scenarii[i][0] + ">" + scenarii[i][0] + "</option>");
  }
  $sel.selectmenu("refresh", true );
};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  console.log("Trashing scenario");
  Code.current_scenario = null;

  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(Blockly.Msg.DISCARD_CODE)) {
    Blockly.mainWorkspace.clear();
  }
};

/*Code.wrapScenario = function(code) {
  var lines = code.split('\n');

  code = "def run():";
  code += "\n";

  for(var i = 0; i < lines.length; i++) {
    code += "  " + lines[i] + "\n";
  }

  code += "\n";

  var tail = [
    '',
    'if __name__ == "__main__":',
    '  from griotte.config import Config',
    '  Config("DEFAULT")',
    '  run()',
    ].join('\n');

  code = code + tail;
  console.log(code);

  return code;
};*/

/*Code.saveScenario = function() {
  if (!Code.current_scenario || (Code.current_scenario.length == 0)) {
    return;
  }

  console.log('saving scenario to ' + Code.current_scenario);
  var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()).innerHTML;
  var codepy = Code.wrapScenario(Blockly.Python.workspaceToCode());
  console.log(xml);
  Griotte.publish('storage.command.set.medias.scenario',
                  { value:
                    { name: Code.current_scenario,
                      xml: xml,
                      code: code
                    },
                    persistent: true
                  });
};*/

// Code.saveToWS = function(name) {
//   var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
// };

Code.restoreScenario = function(name) {
  console.log("about to restore scenario " + name)

  $.ajax({
    url:'/store/scenario/' + name + ".py_meta.json",
    type:"GET",
    contentType:false,
    processData:false,
    cache:false,
    dataType: 'json',
    success:function(resp) {
      console.log(resp)
      Code.restoreScenarioCallback(resp);
    },
  });
};

Code.restoreScenarioCallback = function(message) {
  // python tools/ws_send.py meta.storage.scenario '{ "name": "test", "code": "<xml><block type=\"analog_sensor\" x=\"143\" y=\"51\"><title name=\"NAME\">AN0</title><title name=\"Profil\">IDENTITY</title></block></xml>"}'

  console.log(message.xml);
  var xml = Blockly.Xml.textToDom("<xml>"+message.xml+"</xml>")
  Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
  console.log("loaded scenario " + message.name);
  Code.scenario = message.name;
  $("#scenario-name").val(message.name);
  $('#scenario-save').button( "enable" );
};



/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {

  Code.tabClick(Code.selected);
  Blockly.fireUiEvent(window, 'resize');

  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    Code.bindClick('tab_' + name,
        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }

};
