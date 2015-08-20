/*-----------------------------------------------------------
 GULP : SASS Task
-----------------------------------------------------------*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    gulp.src(['./app/scss/master.scss'])
        .pipe(sass({includePaths: ['scss']}))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./app/css'))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('./app/css/'));
});
