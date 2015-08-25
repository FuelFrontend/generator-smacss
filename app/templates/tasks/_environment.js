/*-----------------------------------------------------------
 GULP : ENVIRONMENT
 Set your environment here, as of now it's development and
 production. You can also include testing and staging
-----------------------------------------------------------*/
/*==========================================================
 GULP: ENVIRONMENT :: Gulp build Tasks - dev, production
===========================================================*/
var gulp = require('gulp'),
    runSequence = require('run-sequence');

var config = require('./config');

gulp.task('build', function () {

    console.log(config.notify.update('\n--------- Build Development Mode  --------------------------------------\n'));
    runSequence('html', 'scripts', 'styles', 'bundle-libraries', 'image', 'fonts', 'server', 'watch');
});

gulp.task('prod', function () {

    console.log(config.notify.update('\n--------- Build Production Mode  ---------------------------------------\n'));
    config.production = true;
    runSequence('html', 'scripts', 'styles', 'bundle-libraries', 'image', 'fonts', 'server', 'watch');

});
