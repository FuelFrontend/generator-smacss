'use strict';
var util = require('util'),
    chalk = require('chalk');

var ScriptBase = require('../script-base.js');

var smacssGenerator = module.exports = function smacssGenerator() {
    ScriptBase.apply(this, arguments);
};

util.inherits(smacssGenerator, ScriptBase);

smacssGenerator.prototype.createFilterFiles = function createFilterFiles() {

  this.log(chalk.yellow('Creating filter, please wait...... \n'));

  this.generateSourceAndTest(
    '_filter',
    'spec/filter',
    'filters',
    this.options['add-index'] || false
  );
};