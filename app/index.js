'use strict';
var yeoman = require('yeoman-generator'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    yosay = require('yosay'),
    chalk = require('chalk');

// STRUCTURE

// constructor
// initializing
// prompting
// configuring
// default
// writing
// conflicts
// install
// end

var smacssGenerator = yeoman.generators.Base.extend({

    constructor: function () {
        // note: arguments and options should be defined in the constructor.
        yeoman.generators.Base.apply(this, arguments);

        this.option('skip-welcome-message', {
            desc: 'Skips the welcome message',
            type: Boolean
        });

        this.option('skip-install', {
            desc: 'Skips the installation of dependencies',
            type: Boolean
        });

        this.option('skip-install-message', {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean
        });

        // This method adds support for a `--coffee` flag
        this.option('coffee');
        // And you can then access it later on this way; e.g.
        this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");
    },
});

smacssGenerator.prototype.initializing = function initializing() {

    this.pkg = require('../package.json');
};

smacssGenerator.prototype.prompting = function prompting() {

    if (!this.options['skip-welcome-message']) {
        // Welcome Message
        this.log(yosay('Yo! Welcome to SMACSS'));
        this.log(chalk.magenta.bold('You\'re using the perfectionist generator for frontend.'));
        this.log(chalk.gray('================================================================'));
        this.log(chalk.gray('Answer (3) simple questions to kick start your project'));
    }

};

smacssGenerator.prototype.askAppType = function askAppType() {
    var done = this.async();

    var prompts = [{
        name: 'appName',
        message: 'What would you like to name your app/site?',
        default: 'smacssProject' // TODO: Replace with current directory [TBD]
        },{
        name: 'appType',
        message: 'Kind of app/site you are trying to build?',
        type: 'list',
        choices:[{
            name: 'Static HTML',
            value: 'typeStaticApp',
            checked: false
        },{
            name: 'Angular App',
            value: 'typeAngularApp',
            checked: false
        }],
        default: 1
    }];
    this.prompt(prompts, function (answers) {
        var type = answers.type;

        this.appName = answers.appName;
        this.appType = answers.appType;

        done();
    }.bind(this));
};

smacssGenerator.prototype.askAppFeatures = function askAppFeatures() {
    var done = this.async();

    var prompts = [{
        name: 'appFeatures',
        message: 'How about some additional features',
        type: 'checkbox',
        choices:[{
            name: ' jQuery',
            value: 'includeQuery',
            checked: false
        },{
            name: ' Modernizr',
            value: 'includeModernizr',
            checked: false
        }]
    }];
    this.prompt(prompts, function (answers) {
        var features = answers.features;

        //console.log(features);

        //this.appFeatureJquery = answers.appFeatures;

        // function hasFeature(feat) {
        //     return features && features.indexOf(feat) !== -1;
        // }

        // this.includeSass = hasFeature('includeSass');
        // this.includeBootstrap = hasFeature('includeBootstrap');
        // this.includeModernizr = hasFeature('includeModernizr');

        // this.includeLibSass = answers.libsass;
        // this.includeRubySass = !answers.libsass;

        this.log(chalk.gray('================================================================'));
        this.log(chalk.gray('Creating the project for you, please wait...'));

        done();
    }.bind(this));
};

smacssGenerator.prototype.scaffoldFolders = function scaffoldFolders() {
    this.mkdir(this.appName + '/app');
    this.mkdir(this.appName + '/app/css');
    this.mkdir(this.appName + '/app/scss');
    this.mkdir(this.appName + '/app/js');
    this.mkdir(this.appName + '/app/images');
    this.mkdir(this.appName + '/app/fonts');
    this.mkdir(this.appName + '/app/partials');
    this.mkdir(this.appName + '/build');
};

smacssGenerator.prototype.copyMainFiles = function copyMainFiles() {
    // Underscore templating context to replace placeholders
    var context = {
        site_name: this.appName,
    };

    // DOT FILE / PROJECT FILES
    // TODO:: Move to projectfiles function
    this.template("_jshintrc", this.appName + "/.jshintrc", context);
    this.template("_gulpfile.js", this.appName + "/gulpfile.js", context);
    this.template("_package.json", this.appName + "/package.json", context);
    //this.template("_bower.json", this.appName + "/bower.json", context);

    // HTML
    this.template("_index.html", this.appName + "/app/index.html", context);
    this.template("partials/_header.html", this.appName + "/app/partials/_header.html", context);
    this.template("partials/_footer.html", this.appName + "/app/partials/_footer.html", context);

    // CSS
    // TODO: Create seperate folder for module and pages
    this.copy("_master.css", this.appName + "/app/css/master.css");
    this.copy("scss/_master.scss", this.appName + "/app/scss/master.scss");
    this.copy("scss/_base.scss", this.appName + "/app/scss/base.scss");
    this.copy("scss/_layout.scss", this.appName + "/app/scss/layout.scss");
    this.copy("scss/_module.scss", this.appName + "/app/scss/module.scss");
    this.copy("scss/_reset.scss", this.appName + "/app/scss/reset.scss");
    this.copy("scss/_variables.scss", this.appName + "/app/scss/variables.scss");
    this.copy("scss/_mixins.scss", this.appName + "/app/scss/mixins.scss");
    this.copy("scss/_page_landing.scss", this.appName + "/app/scss/page-landing.scss");

    // JS
    // TODO: Add JS Structure
    this.copy("js/application.js", this.appName + "/app/js/application.js");
    if(this.appType === 'typeAngularApp') {
        this.copy("angular/_angular.js", this.appName + "/app/js/lib/angular.js");
    }
};

smacssGenerator.prototype.dependencyInstallation = function dependencyInstallation() {
    // Underscore templating context to replace placeholders
    var context = {
        site_name: this.appName,
    };

    var bower = {
        name: this.appName,
        private: true,
        dependencies: {}
    };

    if (this.appType === 'typeAngularApp') {
        bower.dependencies.angular = "~1.3.12";
    }

    this.write(this.appName +'/bower.json', JSON.stringify(bower, null, 2));
}

smacssGenerator.prototype.helper = function helper() {
    //this.log('App Helper functions and methods');
};

smacssGenerator.prototype.errorHanding = function errorHanding() {
    //this.log('Something has gone wrong! Handle errors in this section');
};

smacssGenerator.prototype.install = function install() {
    this.log(chalk.green('================================================================'));
    this.log(chalk.green('Your project is created and now installation will start automatically!'));

    //Change directory and install bower and npm
    var curr_dir = process.cwd();
    process.chdir(curr_dir+"/"+ this.appName);
    this.installDependencies({
        skipInstall: this.options['skip-install']
    });
    this.log(chalk.green('================================================================'));
    this.log(chalk.green('List of Installed packages through npm!'));
    var exec = require('child_process').exec;
    var child;
    child = exec('npm ls', function (error, stdout, stderr) {
     console.log(stdout);
    });
};

smacssGenerator.prototype.paths = function paths() {
    //this.log('Path Handling');
};

smacssGenerator.prototype.projectfiles = function projectfiles() {
    // TODO: Handle project file copying here
    // this.copy('editorconfig', '.editorconfig');
    // this.copy('jshintrc', '.jshintrc');
};

module.exports = smacssGenerator;