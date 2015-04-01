'use strict';
var util = require('util'),
  chalk = require('chalk');
  
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createFilterFiles = function createFilterFiles() {

	this.log(chalk.yellow('Creating filter, please wait...... \n'));

  this.generateSourceAndTest(
    '_filter',
    'spec/filter',
    'filters',
    this.options['add-index'] || false
  );
};