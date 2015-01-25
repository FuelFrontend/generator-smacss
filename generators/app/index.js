'use strict';
var generators = require('yeoman-generator'),
		chalk = require('chalk');

var MyBase = generators.Base.extend({

	// TODO
	// [X] initializing
	// [ ] prompting
	// [ ] configuring
	// [ ] default
	// [ ] writing
	// [ ] conflicts
	// [ ] install
	// [ ] end

	init: function () {
		console.log(this.yeoman);
		console.log(chalk.magenta.bold('You\'re using the perfect frontend generator. Welcome to SMACSS!'));
		console.log(chalk.gray('================================================================'));
		console.log(chalk.gray('Answer (3) simple questions to kick start your project'));
	},

	prompting: function () {
	    var done = this.async();

	    var prompts = [{
	      name: 'appname',
	      message: 'What would you like to name your app/site?',
	      default: 'New Project'
	    },{
				name: 'apptype',
				message: 'Kind of app/site you are trying to build?',
				type: 'list',
				choices:[{
						name: 'Static HTML',
						value: 'includeStaticApp',
						checked: false
		     	},{
		        name: 'Angular App',
		        value: 'includeAngularApp',
		        checked: false
		      },{
		        name: 'Ember App',
		        value: 'includeEmberApp',
		        checked: false
		      },{
		        name: 'Mobile App',
		        value: 'includeMobileApp',
		        checked: false
		    }],
	      default: 1
	    },{
				name: 'appfeatures',
				message: 'How about some additional features',
				type: 'checkbox',
				choices:[{
					  name: 'Modernizr',
					  value: 'includeModernizr',
					  checked: false
					},{
					  name: 'jQuery',
					  value: 'includeQuery',
					  checked: false
					},{
					  name: 'Respond',
					  value: 'includeRespond',
					  checked: false
				}]
	    }];

	    this.prompt(prompts, function (props) {
	    	var appName = props.appname;
	    	var appType = props.apptype;
	    	var appFeatures = props.appfeatures;

	    	this.log("=============================== Creating project with following details  ===============================")
	    	this.log('App Name: ' + appName);
	    	this.log('App Type: ' + appType);
	    	this.log('App Features: ' + appFeatures);

	      done();
	    }.bind(this));
	},

	constructor: function () {
		// note: arguments and options should be defined in the constructor.
	    generators.Base.apply(this, arguments);

		// This makes `appname` a required argument.
		// this.argument('appname', { type: String, required: true });
		// And you can then access it later on this way; e.g. CamelCased
		// this.appname = this._.camelize(this.appname);

	    // This method adds support for a `--coffee` flag
	    this.option('coffee');
	    // And you can then access it later on this way; e.g.
	    this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
	},

	helper: function () {
  	console.log('Need some Help?');
	},

	errorHanding: function () {
    this.log('Something has gone wrong!');
	},

	install: function () {
		generator.installDependencies();
    //this.spawnCommand('composer', ['install']);
  },

  paths: function () {
    var destinationRoot = this.destinationRoot();
    //this.log(destinationRoot);
    // returns '~/projects'

    // this.destinationPath('index.js');
    // returns '~/projects/index.js'
  }
});

module.exports = MyBase.extend({
  exec: function () {
  	// Welcome Message and intialiazer
    this.init();
    this.paths();

    // Ask the User for Project Configuration
    this.prompting();
  }
});