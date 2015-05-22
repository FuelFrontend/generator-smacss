/*-----------------------------------------------------------
 GULP : SASS Task
-----------------------------------------------------------*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
    gulp.src(['./app/scss/master.scss'])
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./app/css'))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('./app/css/'));
});
