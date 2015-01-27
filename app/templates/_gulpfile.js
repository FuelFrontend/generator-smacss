var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync');

gulp.task('sass', function () {
    gulp.src(['scss/master.scss'])
        .pipe(sass({includePaths: ['scss']}))
        //.pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('css'))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('css/'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
});
