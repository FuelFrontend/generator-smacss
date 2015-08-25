/*-----------------------------------------------------------
 GULP : Browser Sync Task
-----------------------------------------------------------*/
var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init(["./app/*.html", "./app/js/*.js", "./app/css/*.css", "./app/images/*.*", "./app/fonts/*.*"], {
        server: {
            baseDir: "./app/"
        }
    });
});
