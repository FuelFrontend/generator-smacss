'use strict';
var generators = require('yeoman-generator');

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
		console.log('Welcome to SMACSS!');
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
	      default: 1 // default : this.appname // Default to current folder name
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
	    generators.Base.apply(this, arguments);

	    // This method adds support for a `--coffee` flag
	    this.option('coffee');
	    // And you can then access it later on this way; e.g.
	    this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
	},

  	helper: function () {
    	console.log('won\'t be called');
  	},
  	errorHanding: function () {
	    this.log('Something has gone wrong!');
	}
});

module.exports = MyBase.extend({
  exec: function () {
  	//this.prompt("What?");
    this.init();

    this.prompting();
  }
});