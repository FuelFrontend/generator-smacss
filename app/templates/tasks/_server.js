/*===========================================================
 GULP : APP TASKS :: Start server and live reload
===========================================================*/
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');
var portScanner = require('portscanner');

gulp.task('server', function () {
    console.log(config.notify.update('\n--------- Server started at http://localhost:'+ config.serverConfiguration.port +' ------------------------\n'));
    portScanner.findAPortNotInUse(config.serverConfiguration.port, config.serverConfiguration.port + 10, '127.0.0.1', function(error, port) {

        config.serverConfiguration.port = port;
        portScanner.findAPortNotInUse(config.serverConfiguration.livereload.port, config.serverConfiguration.livereload.port + 10, '127.0.0.1', function(error, port) {

                config.serverConfiguration.livereload.port = port;

                return gulp.src('build')
                    .pipe(plugins.webserver(config.serverConfiguration));
          });
    });
});