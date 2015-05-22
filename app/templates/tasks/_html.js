/*===========================================================
 GULP : APP TASKS :: HTML -- Minify html to build
===========================================================*/
var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');

gulp.task('html', function () {

    console.log(config.notify.update('\n--------- Running HTML tasks ------------------------------------------\n'));
    return gulp.src([config.source.root + '/*.html', config.source.root + '/**/*.html'])
        .pipe(plugins.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulpIf(config.production, plugins.minifyHtml(config.opts)))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.root));
});