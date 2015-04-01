'use strict';
var util = require('util'),
  chalk = require('chalk');

var ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createServiceFiles = function createServiceFiles() {
	
	this.log(chalk.yellow('Creating service, please wait...... \n'));

  this.generateSourceAndTest(
    '_service',
    'spec/service',
    'services',
    this.options['skip-add'] || false
  );
};