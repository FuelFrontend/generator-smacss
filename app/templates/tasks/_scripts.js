/*===========================================================
 GULP: APP TASKS :: Script -- js hint, uglify & concat
===========================================================*/
var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    jshintStylish = require('jshint-stylish'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');

gulp.task('scripts', function () {

    console.log(config.notify.update('\n--------- Running SCRIPT tasks -----------------------------------------\n'));
    return gulp.src([config.source.js + '/*.js', config.source.js + '/**/*.js'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(jshintStylish))
        .pipe(plugins.concat('application.js'))
        .pipe(gulpIf(config.production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.js));
});
