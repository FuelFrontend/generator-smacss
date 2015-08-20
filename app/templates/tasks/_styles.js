/*===========================================================
 GULP : APP TASKS :: CSS & SASS -- minify, concat
===========================================================*/
var gulp = require('gulp'),
    config = require('./config'),
    gulpIf = require('gulp-if'),
    gulploadPlugins = require('gulp-load-plugins'),
    autoprefixer = require('gulp-autoprefixer');

var plugins = gulploadPlugins();
var config = require('./config');

var callback = function (err) {
    console.log(config.notify.error('\n--------- SASS file has error clear it to see changes, check the log below -------------\n'));
    console.log(err);
};

gulp.task('sass', function () {

    console.log(config.notify.update('\n--------- Running SASS tasks -------------------------------------------'));
    return gulp.src(['app/scss/master.scss'])
        .pipe(plugins.sass({ onError: callback }))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.source.css));
});

gulp.task('styles', ['sass'], function () {

    console.log(config.notify.update('\n--------- Running CSS tasks --------------------------------------------\n'));
    return gulp.src([config.source.css + '/**/*.css'])
        .pipe(autoprefixer({
            browsers: config.browserVersion,
            cascade: false
        }))
        .pipe(gulpIf(config.production, plugins.minifyCss()))
        .pipe(plugins.concat('master.css'))
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.css));
});
