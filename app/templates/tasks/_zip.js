// GULP: HELPERS :: Zip all build files with date
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins'),
    del = require('del');

var plugins = gulploadPlugins();

var config = require('./config');

gulp.task('zip', function () {
    var date = new Date().toDateString();

    console.log(config.notify.update('\n--------- Zipping Build Files ------------------------------------------\n'));
    return gulp.src([config.build.root + '/**/*'])
        .pipe(plugins.zip('ProjectName - ' + date + '.zip'))
        .pipe(plugins.size())
        .pipe(gulp.dest('./zip/'));
});
