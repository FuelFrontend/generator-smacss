/*===========================================================
 GULP: APP TASKS :: Images minification
===========================================================*/
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');

gulp.task('image', function () {

    console.log(config.notify.update('\n--------- Image Minification --------------------------------------------\n'));
    return gulp.src([config.source.images + '/*.*', config.source.images + '/**/*.*'])
        .pipe(plugins.imagemin())
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.images));
});
