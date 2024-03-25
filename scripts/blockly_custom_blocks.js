// Custom block to move green cube
Blockly.Blocks['move_green_cube'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("move green cube")
          .appendField(new Blockly.FieldDropdown([["up", "UP"], ["down", "DOWN"]]), "direction")
          .appendField("by")
          .appendField(new Blockly.FieldNumber(1, 1), "units")
          .appendField("units");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Move the cube object up or down by a certain number of units");
      this.setHelpUrl("");
    }
  };
  
  
// Define the JavaScript code generation for the custom Blockly block
Blockly.JavaScript['move_green_cube'] = function(block) {
    var direction = block.getFieldValue('direction');
    var units = block.getFieldValue('units');
    var code = 'moveCube("' + direction + '", ' + units + ');\n';
    return code;
};

// Custom block to move red cube
Blockly.Blocks['move_red_cube'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move red cube")
            .appendField(new Blockly.FieldDropdown([["up", "UP"], ["down", "DOWN"]]), "direction")
            .appendField("by")
            .appendField(new Blockly.FieldNumber(1, 1), "units")
            .appendField("units");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160); 
        this.setTooltip("Move the red cube object up or down by a certain number of units");
        this.setHelpUrl("");
    }
};

// Define the JavaScript code generation for the new Blockly block
Blockly.JavaScript['move_red_cube'] = function(block) {
    var direction = block.getFieldValue('direction');
    var units = block.getFieldValue('units');
    var code = 'moveRedCube("' + direction + '", ' + units + ');\n';
    return code;
};
