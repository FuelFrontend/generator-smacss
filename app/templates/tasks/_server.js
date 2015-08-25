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
    var serverPort = config.serverConfiguration.port;
    portScanner.findAPortNotInUse(serverPort, serverPort + 10, '127.0.0.1', function(error, port) {

        config.serverConfiguration.port = port;
        var lrPort = config.serverConfiguration.livereload.port;
        portScanner.findAPortNotInUse(lrPort, lrPort + 10, '127.0.0.1', function(error, port) {

                config.serverConfiguration.livereload.port = port;

                return gulp.src('build')
                    .pipe(plugins.webserver(config.serverConfiguration));
          });
    });
});
