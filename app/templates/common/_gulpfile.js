'use strict';
/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins'),
    requireDir = require('require-dir');

var tasks = requireDir('./tasks');

var plugins = gulploadPlugins();

/*==========================================================
 GULP: ENVIRONMENT :: Gulp Default Tasks -- build
===========================================================*/

gulp.task('default', ['build']);


/*-----------------------------------------------------------
 GULP : HELPERS
 Quick tasks to make your life easier!
-----------------------------------------------------------*/

// GULP: HELPERS :: List all gulp plugin tasks
gulp.task('help', plugins.taskListing);
