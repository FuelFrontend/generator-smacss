var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
    fileinclude = require('gulp-file-include');

gulp.task('sass', function () {
    gulp.src(['app/scss/master.scss'])
        .pipe(sass({includePaths: ['scss']}))
        //.pipe(sass({errLogToConsole: true}))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["app/css/*.css", "app/js/*.js"], {
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("app/scss/*.scss", ['sass']);
});
