/*===========================================================
 GULP : APP TASKS :: Start server and live reload
===========================================================*/
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');

gulp.task('server', function () {
    console.log(config.notify.update('\n--------- Server started at http://localhost:'+ config.serverConfiguration.port +' ------------------------\n'));
    return gulp.src('build')
        .pipe(plugins.webserver(config.serverConfiguration));
});