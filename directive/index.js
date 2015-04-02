'use strict';
var util = require('util'),
	chalk = require('chalk');

var ScriptBase = require('../script-base.js');

var smacssGenerator = module.exports = function smacssGenerator() {
	ScriptBase.apply(this, arguments);
};

util.inherits(smacssGenerator, ScriptBase);

smacssGenerator.prototype.createDirectiveFiles = function createDirectiveFiles() {
	this.log(chalk.yellow('Creating directive, please wait...... \n'));

	this.generateSourceAndTest(
		'_directive',
		'spec/directive',
		'directives',
		this.options['add-index'] || false
	);
};