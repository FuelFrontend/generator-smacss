'use strict';
var util  = require('util'),
    chalk = require('chalk');

var ScriptBase = require('../script-base.js');

var smacssGenerator = module.exports = function smacssGenerator() {
  ScriptBase.apply(this, arguments);

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }
};

util.inherits(smacssGenerator, ScriptBase);

// Function to create controller
smacssGenerator.prototype.createControllerFiles = function createControllerFiles() {
  this.log(chalk.yellow('Creating controller, please wait...... \n\n'));

  this.generateSourceAndTest(
    '_controller', // controller template name
    'spec/controller', //for generating test file in test folder
    'controllers', //target dir
    this.options['skip-add'] || false
  );
};