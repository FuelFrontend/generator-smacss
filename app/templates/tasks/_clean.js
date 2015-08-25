// GULP: HELPERS :: Clean - remove files and folder in build
var gulp = require('gulp'),
    del = require('del');

var config = require('./config');

gulp.task('clean', function () {
    console.log(config.notify.update('\n--------- Clean:Build Folder ------------------------------------------\n'));

    del('build/', function (err) {
    console.log(config.notify.update('All are files deleted from the build folder'));
    });
});
