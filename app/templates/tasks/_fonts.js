/*===========================================================
 GULP : APP TASKS :: FONTS
===========================================================*/
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');

gulp.task('fonts', function () {

    console.log(config.notify.update('\n--------- Running Fonts tasks --------------------------------------------\n'));
    return gulp.src([config.source.fonts + '/*.*', config.source.fonts + '/**/*.*'])
        .pipe(plugins.size())
        .pipe(gulp.dest(config.build.fonts));
});
