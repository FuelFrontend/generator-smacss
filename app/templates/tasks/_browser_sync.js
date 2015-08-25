/*==========================================================
 GULP: APP TASKS :: Browser sync to sync with browser
===========================================================*/
var gulp = require('gulp'),
    browserSync = require('browser-sync');

var config = require('./config');

gulp.task('browser-sync', function () {
    browserSync.init([config.build.root + '*/*.*', config.build.root + '**/*.*'],
    {
        server : { baseDir : './build' }
    });
});
