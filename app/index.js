'use strict';
var yeoman = require('yeoman-generator'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    yosay = require('yosay'),
    chalk = require('chalk');

var smacssGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        // note: arguments and options should be defined in the constructor.
        yeoman.generators.Base.apply(this, arguments);

        this.option('app-suffix', {
            desc: 'Allow a custom suffix to be added to the module name',
            type: String,
            required: 'false'
        });
        this.env.options['app-suffix'] = this.options['app-suffix'];

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

smacssGenerator.prototype.welcome = function welcome() {
    if (!this.options['skip-welcome-message']) {
        this.log(yosay('Yo! Welcome to SMACSS'));
        this.log(chalk.magenta.bold('You\'re using the perfectionist generator for frontend.'));
        this.log(chalk.gray('================================================================'));
        this.log(chalk.gray('Answer simple questions to kick start your project'));
    }
};

smacssGenerator.prototype.askAppType = function askAppType() {
    var done = this.async();

    var prompts = [{
        name: 'appName',
        message: 'What would you like to name your app/site?',
        default: process.cwd().split(path.sep).pop()
        },{
        name: 'appType',
        message: 'Kind of app/site you are trying to build?',
        type: 'list',
        choices:[{
            name: 'Simple Web App',
            value: 'typeSimpleWebApp',
            checked: false
        },{
            name: 'Full Pack Web App',
            value: 'typeFullPackWebApp',
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
            checked: true
        },{
            name: ' Modernizr',
            value: 'includeModernizr',
            checked: false
        }]
    }];
    this.prompt(prompts, function (answers) {
        var appFeatures = answers.appFeatures;

        var hasFeature = function (feat) {
            return appFeatures.indexOf(feat) !== -1;
        };

        this.includeQuery = hasFeature('includeQuery');
        this.includeModernizr = hasFeature('includeModernizr');

        this.log(chalk.gray('================================================================'));
        this.log(chalk.gray('Creating the project structure'));

        done();
    }.bind(this));
};

smacssGenerator.prototype.scaffoldFolders = function scaffoldFolders() {
    // Common Scaffolding for all projets
    this.mkdir(this.appName + '/app');
    this.mkdir(this.appName + '/app/css');
    this.mkdir(this.appName + '/app/scss');
    this.mkdir(this.appName + '/app/js');
    this.mkdir(this.appName + '/app/images');
    this.mkdir(this.appName + '/app/fonts');

    if(this.appType == 'typeFullPackWebApp' || this.appType == 'typeAngularApp') {
        this.mkdir(this.appName + '/app/partials');
        this.mkdir(this.appName + '/build');
    }
};

smacssGenerator.prototype.copyMainFiles = function copyMainFiles() {
    // Underscore templating context to replace placeholders
    smacssGenerator.context = {
        site_name: this.appName,
    };

    // HTML
    if(this.appType == 'typeSimpleWebApp') {
        this.template("simple-web-app/_index.html", this.appName + "/app/index.html", smacssGenerator.context);
    }
    else {
        this.template("_index.html", this.appName + "/app/index.html", smacssGenerator.context);
    }

    // Partial File Include
    if(this.appType == 'typeFullPackWebApp' || this.appType == 'typeAngularApp') {
        this.template("partials/_header.html", this.appName + "/app/partials/_header.html", smacssGenerator.context);
        this.template("partials/_footer.html", this.appName + "/app/partials/_footer.html", smacssGenerator.context);
    }

    // CSS
    this.copy("_master.css", this.appName + "/app/css/master.css");

    // SMACSS - SCSS Structure
    // TODO: Update structure based on ticket #7
    this.copy("scss/_master.scss", this.appName + "/app/scss/master.scss");
    this.copy("scss/_base.scss", this.appName + "/app/scss/base.scss");
    this.copy("scss/_layout.scss", this.appName + "/app/scss/layout.scss");
    this.copy("scss/_reset.scss", this.appName + "/app/scss/reset.scss");
    this.copy("scss/_variables.scss", this.appName + "/app/scss/variables.scss");
    this.copy("scss/_mixins.scss", this.appName + "/app/scss/mixins.scss");
    this.copy("scss/_module.scss", this.appName + "/app/scss/modules/module.scss");
    this.copy("scss/_page_landing.scss", this.appName + "/app/scss/pages/page-landing.scss");

    // JS
    // TODO: Add JS Structure
    this.copy("js/_application.js", this.appName + "/app/js/application.js");

    // TODO: remove this once bower is fixed.
    // if(this.appType === 'typeAngularApp') {
    //     this.copy("angular/_angular.js", this.appName + "/app/js/lib/angular.js");
    // }
};

smacssGenerator.prototype.projectfiles = function projectfiles() {
    if(this.appType == 'typeSimpleWebApp') {
        this.template("simple-web-app/_gulpfile.js", this.appName + "/gulpfile.js", smacssGenerator.context);
        this.template("simple-web-app/_package.json", this.appName + "/package.json", smacssGenerator.context);
    }
    else {
        this.template("_gulpfile.js", this.appName + "/gulpfile.js", smacssGenerator.context);
        this.template("_package.json", this.appName + "/package.json", smacssGenerator.context);
    }

    // Root Files
    this.template("root/_jshintrc", this.appName + "/.jshintrc", smacssGenerator.context);
    this.copy("root/_gitignore", this.appName + "/.gitignore");
    this.copy("root/_gitattributes", this.appName + "/.gitattributes");
};

smacssGenerator.prototype.injectDependencies = function injectDependencies() {

    var bower = {
        name: this.appName,
        private: true,
        dependencies: {}
    };

    if (this.appType === 'typeAngularApp') {
        bower.dependencies.angular = "~1.3.12";
    }

    if (this.includeQuery) {
        bower.dependencies.jquery = '~1.11.1';
    }

    if (this.includeModernizr) {
        bower.dependencies.modernizr = '~2.8.1';
    }

    this.copy('root/_bowerrc', this.appName + '/.bowerrc');
    this.write(this.appName +'/bower.json', JSON.stringify(bower, null, 2));
}

smacssGenerator.prototype.install = function install() {

    if (this.options['skip-install']) {
        this.log(chalk.gray('================================================================'));
        this.log(
          'Next Steps:' +
          '\n1) Now '+ chalk.yellow.bold('cd '+ this.appName +'') + ' into your project folder' +
          '\n2) Install dependencies by typing '+ chalk.yellow.bold('npm install & bower install') +
          '\n3) Run the server using: ' + chalk.yellow.bold('gulp')
        );
    }
    else {
        //Change directory and install bower and npm
        var currentDirectory = process.cwd();
        this.appPath = currentDirectory+"/"+ this.appName;

        process.chdir(this.appPath);

        this.log(chalk.gray('================================================================'));
        this.log(chalk.gray('Installing Dependencies, please wait...'));
        console.log(this.appPath);

        this.spawnCommand('npm', ['install'], { cwd: this.appPath});

        // TODO: Change working directory, Run gulp after dependency installation
        /*var exec = require('child_process').exec;
        var child;
        child = exec('gulp', function (error, stdout, stderr) {
            console.log(stdout);
        });*/
    }
};

smacssGenerator.prototype.helper = function helper() {
    //this.log('App Helper functions and methods');
};

smacssGenerator.prototype.errorHanding = function errorHanding() {
    //this.log('Something has gone wrong! Handle errors in this section');
};

smacssGenerator.prototype.paths = function paths() {
    //this.log('Path Handling');
};

module.exports = smacssGenerator;