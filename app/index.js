'use strict';
var yeoman = require('yeoman-generator'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    yosay = require('yosay'),
    chalk = require('chalk'),
    shell = require('shelljs');

var smacssGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        // note: arguments and options should be defined in the constructor.
        yeoman.generators.Base.apply(this, arguments);

        // Options
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
        this.log(
          chalk.magenta("Your'e using the Perfectionist generator for Frontend\n") +
          chalk.yellow('┌──────────────────────────────────────────────────────────────┐ \n' +
                       '| Answer simple questions to kick start your project           | \n' +
                       '└──────────────────────────────────────────────────────────────┘ ')
        );
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
        },{
            name: 'Restify App',
            value: 'typeRestifyApp',
            checked: false
        }],
        default: 1
    }];
    this.prompt(prompts, function (answers) {
        var type = answers.type;

        this.appName = this._.camelize(this._.slugify(this._.humanize(answers.appName)));
        this.appType = answers.appType;

        // Underscore templating context to replace placeholders
        smacssGenerator.context = {
            site_name: this.appName,
        };

        done();
    }.bind(this));
};

smacssGenerator.prototype.askAppFeatures = function askAppFeatures() {
    if(this.appType === 'typeFullPackWebApp' || this.appType === 'typeAngularApp') {
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

            done();
        }.bind(this));
    }
};

smacssGenerator.prototype.askAngularModules = function askAngularModules() {
    if(this.appType === 'typeAngularApp') {
        var done = this.async();
        var prompts = [{
            name: 'angularModules',
            message: 'How about including some angular modules',
            type: 'checkbox',
            choices:[{
                name: ' Angular Route',
                value: 'includeRouteModule',
                checked: true
            },{
                name: ' Angular Resource',
                value: 'includeResourceModule',
                checked: false
            },{
                name: ' Angular Sanitize',
                value: 'includeSanitizeModule',
                checked: false
            },{
                name: ' Angular Animate',
                value: 'includeAnimateModule',
                checked: false
            }]
        }];
        this.prompt(prompts, function (answers) {

            var hasModule = function (mod) {
                return answers.angularModules.indexOf(mod) !== -1;
            };

            this.includeRouteModule = hasModule('includeRouteModule');
            this.includeResourceModule = hasModule('includeResourceModule');
            this.includeSanitizeModule = hasModule('includeSanitizeModule');
            this.includeAnimateModule = hasModule('includeAnimateModule');

            var angMods = [];

            if (this.includeRouteModule) {
              angMods.push("'ngRoute'");
            }
            if (this.includeResourceModule) {
              angMods.push("'ngResource'");
            }
            if (this.includeSanitizeModule) {
              angMods.push("'ngSanitize'");
            }
            if (this.includeAnimateModule) {
              angMods.push("'ngAnimate'");
            }

            if (angMods.length) {
              this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
            }

            done();
        }.bind(this));
    }
};

smacssGenerator.prototype.scaffoldFolders = function scaffoldFolders() {
    this.log(
      chalk.yellow('\n┌──────────────────────────────────────────────────────────────┐ \n' +
                     '| Creating the project structure                               | \n' +
                     '└──────────────────────────────────────────────────────────────┘ ')
    );

    if (this.appType === 'typeRestifyApp') {
      this.mkdir(this.appName + '/controllers');
      this.mkdir(this.appName + '/models');
      this.mkdir(this.appName + '/utils');

    } else {

      // Common Scaffolding for all projets
      this.mkdir(this.appName + '/app');
      this.mkdir(this.appName + '/app/css');
      this.mkdir(this.appName + '/app/scss');
      this.mkdir(this.appName + '/app/js');
      this.mkdir(this.appName + '/app/images');
      this.mkdir(this.appName + '/app/fonts');

      if(this.appType === 'typeFullPackWebApp' || this.appType === 'typeAngularApp') {
          this.mkdir(this.appName + '/app/partials');
          this.mkdir(this.appName + '/build');
      }
    }
};

smacssGenerator.prototype.copyHTMLFiles = function copyHTMLFiles() {

  if (this.appType == 'typeRestifyApp') {
    return false;
  }

  // Replace folder name with appType variable
  this.copy("common/_404.html", this.appName + "/app/404.html");
  this.template("_" + this.appType + "/_index.html", this.appName + "/app/index.html", smacssGenerator.context);

  // Partial File Include
  if(this.appType === 'typeFullPackWebApp' || this.appType === 'typeAngularApp') {
      this.template("partials/_header.html", this.appName + "/app/partials/_header.html", smacssGenerator.context);
      this.template("partials/_footer.html", this.appName + "/app/partials/_footer.html", smacssGenerator.context);
  }
};

smacssGenerator.prototype.copyCSSFiles = function copyCSSFiles() {

  if (this.appType == 'typeRestifyApp') {
    return false;
  }

  this.copy("common/_master.css", this.appName + "/app/css/master.css");

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
};

smacssGenerator.prototype.copyJSFiles = function copyJSFiles() {

    if (this.appType == 'typeRestifyApp') {
      this.template("_typeRestifyApp/_app.js", this.appName + "/app.js", smacssGenerator.context );
      this.template("_typeRestifyApp/_routes.js", this.appName + "/routes.js", smacssGenerator.context );
      this.template("_typeRestifyApp/_db.js", this.appName + "/db.js", smacssGenerator.context );
    } else {

      if (this.appType === 'typeAngularApp') {
          this.template("js/_angular_application.js", this.appName + "/app/js/application.js", smacssGenerator.context);
      }
      else {
          this.copy("js/_application.js", this.appName + "/app/js/application.js");
      }
    }
};

smacssGenerator.prototype.copyDependencyFiles = function copyDependencyFiles() {

  if (this.appType == 'typeRestifyApp') {
    this.template("_typeRestifyApp/_package.json", this.appName + "/package.json", smacssGenerator.context);
    this.template("_typeRestifyApp/_config.json", this.appName + "/config.json", smacssGenerator.context);
    this.template("_typeRestifyApp/_userSchema.js", this.appName + "/models/userSchema.js", smacssGenerator.context);
    this.template("_typeRestifyApp/_userController.js", this.appName + "/controllers/userController.js", smacssGenerator.context);
    return false;
  }

  if(this.appType === 'typeFullPackWebApp' || this.appType === 'typeAngularApp') {
    this.template("common/_gulpfile.js", this.appName + "/gulpfile.js", smacssGenerator.context);
  }
  else {
    this.template("_typeSimpleWebApp/_gulpfile.js", this.appName + "/gulpfile.js", smacssGenerator.context);
  }
  this.template("_" + this.appType + "/_package.json", this.appName + "/package.json", smacssGenerator.context);
};

smacssGenerator.prototype.copyProjectfiles = function copyProjectfiles() {
  this.copy("common/_gitignore", this.appName + "/.gitignore");
  this.copy("common/_gitattributes", this.appName + "/.gitattributes");

  if (this.appType == 'typeRestifyApp') {
    return false;
  }

  this.copy("common/_robots.txt", this.appName + "/robots.txt");
  this.copy("common/_favicon.ico", this.appName + "/app/favicon.ico");

  if(this.appType !== 'typeSimpleWebApp') {
    this.template("common/_jshintrc", this.appName + "/.jshintrc", smacssGenerator.context);
  }
};

smacssGenerator.prototype.injectDependencies = function injectDependencies() {
    // Bower is supported only in full & angular app types
    if(this.appType === 'typeFullPackWebApp' || this.appType === 'typeAngularApp') {
        var bower = {
            name: this.appName,
            private: true,
            dependencies: {}
        };
        this.copy('common/_bowerrc', this.appName + '/.bowerrc');

        this.template("_" + this.appType + '/_bower.json', this.appName + '/bower.json');
    }
};

smacssGenerator.prototype.install = function install() {
    // Installation context object
    var installContext = {};
    installContext.appPath = process.cwd() + "/"+ this.appName;
    process.chdir(installContext.appPath); // activating app directory for installation

    // Assign context based on app types
    if(this.appType === 'typeSimpleWebApp' || this.appType == 'typeRestifyApp') {
        installContext.helpCommand = 'npm install';
        installContext.includeNpm = true;
        installContext.includeBower = false;
    }
    else {
        installContext.helpCommand = 'npm install & bower install';
        installContext.includeNpm = true;
        installContext.includeBower = true;
    }

    if (this.options['skip-install']) {
        this.log(
          chalk.green('\n ✔  Project structure created successfully! \n\n') +
          chalk.yellow('┌──────────────────────────────────────────────────────────────┐ \n' +
                       '| Follow the instructions below                                | \n' +
                       '└──────────────────────────────────────────────────────────────┘ ')
        );

        var skipHelpMessage = function(appname, command) {
            console.log(
              'Next Steps:' +
              '\n1) Now '+ chalk.yellow.bold('cd '+ appname +'') + ' into your project folder' +
              '\n2) Install dependencies by typing '+ chalk.yellow.bold(command) +
              '\n3) Run the server using: ' + chalk.yellow.bold('gulp')
            )
        };

        skipHelpMessage(this.appName, installContext.helpCommand);
    }
    else {
        this.log(
          chalk.green('\n ✔  Project structure created successfully! \n\n') +
          chalk.yellow('┌──────────────────────────────────────────────────────────────┐ \n' +
                       '| Installating Dependencies, Please wait...                    | \n' +
                       '└──────────────────────────────────────────────────────────────┘ ')
        );

        this.on('end', function () {
            this.installDependencies({
                bower: installContext.includeBower,
                npm: installContext.includeNpm,
                callback: function () {
                    this.emit('dependenciesInstalled');
                }.bind(this)
            });
        });

        this.on('dependenciesInstalled', function() {
            this.log(
              chalk.green('\n ✔  Dependencies installed successfully! \n\n') +
              chalk.yellow('┌──────────────────────────────────────────────────────────────┐ \n' +
                           '| Please wait while we start the server...                     | \n' +
                           '└──────────────────────────────────────────────────────────────┘ \n')
            );

            shell.cd(installContext.appPath);

            if (this.appType == 'typeRestifyApp') {
              shell.exec('node app.js');
              this.log(chalk.green('\n ✔  Please make sure your Database server is running! \n\n'));
            } else {
              shell.exec('gulp'); // trigger the server using gulp command
            }
        });
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
