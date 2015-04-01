'use strict';
var util = require('util'),
    ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {

	this.log(chalk.yellow('Creating directive, please wait...... \n'));

  this.generateSourceAndTest(
    '_directive',
    'spec/directive',
    'directives',
    this.options['add-index'] || false
  );
};