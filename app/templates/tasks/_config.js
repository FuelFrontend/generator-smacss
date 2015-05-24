var chalk = require('chalk');

/*-----------------------------------------------------------
 GULP: APP CONFIGURATION
 Source, Build folder and other application configuration
-----------------------------------------------------------*/
var config =  function() {

    // Source Path
    var src = {
        root   : 'app',
        css    : 'app/css',
        scss   : 'app/scss',
        js     : 'app/js',
        images : 'app/images',
        fonts  : 'app/fonts',
        bower  : './bower_components',
        zip    : './zip'
    };

    // Build Path
    var build = {
        root   : 'build',
        css    : 'build/css',
        js     : 'build/js',
        images : 'build/images',
        fonts  : 'build/fonts'
    };

    // Server Configuration
    var serverConfiguration = {
        host       : 'localhost',
        port       : 3000,
        livereload : true,
        open       : true
    };

    // Default production mode set to false
    var production = false;

    // Bower Configuration
    var bowerConfiguration = {
        paths: {
            bowerDirectory : src.bower,
            bowerrc        : '.bowerrc',
            bowerJson      : 'bower.json'
        }
    };

    // Minification options for HTML
    var opts = {
        comments : false,
        quotes   : true,
        spare    : true,
        empty    : true,
        cdata    : true
    };

    // Chalk config
    var notify = {
        error   : chalk.red.bold,
        warning : chalk.black.bold.bgYellow,
        update  : chalk.yellow.underline,
        success : chalk.green
    };

    return {
        source: src,
        build: build,
        serverConfiguration: serverConfiguration,
        production: production,
        bowerConfiguration: bowerConfiguration,
        opts: opts,
        notify: notify
    };
};

module.exports = config();