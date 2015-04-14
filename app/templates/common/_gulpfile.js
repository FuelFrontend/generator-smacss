'use strict';
/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/
var gulp = require('gulp'),
    bower = require('bower'),
    del = require('del'),
    open = require('open'),
    chalk = require('chalk'),
    gulpIf = require('gulp-if'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    jshintStylish = require('jshint-stylish'),
    fileInclude = require('gulp-file-include'),
    mainBowerFiles = require('main-bower-files'),
    sourcemaps = require('gulp-sourcemaps'),
    filter = require('gulp-filter'),
    underscore = require('underscore'),
    underscoreStr = require('underscore.string'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var exclude = [];

var filterByExtension = function(extension){
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

/*-----------------------------------------------------------
 GULP: APP CONFIGURATION
 Source, Build folder and other application configuration
-----------------------------------------------------------*/
// Source Path
var src = {
    root   : 'app',
    css    : 'app/css',
    scss   : 'app/scss',
    js     : 'app/js',
    images : 'app/images',
    fonts  : 'app/fonts',
    bower  : './bower_components',
    zip    : './zip'
};

// Build Path
var build = {
    root   : 'build',
    css    : 'build/css',
    js     : 'build/js',
    images : 'build/images',
    fonts  : 'build/fonts'
};

// Server Configuration
var serverConfiguration = {
    host       : 'localhost',
    port       : 3000,
    livereload : true,
    open       : true
};

// Default production mode set to false
var production = false;

// Bower Configuration
var bowerConfiguration = {
    paths: {
        bowerDirectory : src.bower,
        bowerrc        : '.bowerrc',
        bowerJson      : 'bower.json'
    }
};

// Minification options for HTML
var opts = {
    comments : false,
    quotes   : true,
    spare    : true,
    empty    : true,
    cdata    : true
};

// Chalk config
var error   = chalk.red.bold,
    warning = chalk.black.bold.bgYellow,
    update  = chalk.yellow.underline,
    success = chalk.green;

/*-----------------------------------------------------------
 GULP : APP TASKS
 Necessary gulp tasks required to run your application like
 magic. Feel free to add more tasks in this area
-----------------------------------------------------------*/
/*===========================================================
 GULP : APP TASKS :: Start server and live reload
===========================================================*/

gulp.task('server', function () {

    console.log(update('\n--------- Server started at http://localhost:'+ serverConfiguration.port +' ------------------------\n'));
    return gulp.src('build')
        .pipe(plugins.webserver(serverConfiguration));
});

/*===========================================================
 GULP : APP TASKS :: HTML -- Minify html to build
===========================================================*/

gulp.task('html', function () {

    console.log(update('\n--------- Running HTML tasks ------------------------------------------\n'));
    return gulp.src([src.root + '/*.html', src.root + '/**/*.html'])
        .pipe(plugins.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulpIf(production, plugins.minifyHtml(opts)))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.root));
});

/*===========================================================
 GULP : APP TASKS :: CSS & SASS -- minify, concat
===========================================================*/

var callback = function (err) {
    console.log(error('\n--------- SASS file has error clear it to see changes, check the log below -------------\n'));
    console.log(err);
};

gulp.task('sass', function () {

    console.log(update('\n--------- Running SASS tasks -------------------------------------------'));
    return gulp.src(['app/scss/master.scss'])
        .pipe(plugins.sass({ onError: callback }))
        .pipe(plugins.size())
        .pipe(gulp.dest(src.css));
});

gulp.task('fonts', function () {

    console.log(update('\n--------- Running Fonts tasks --------------------------------------------\n'));
    return gulp.src([src.fonts + '/*.*', src.fonts + '/**/*.*'])
        .pipe(plugins.size())
        .pipe(gulp.dest(build.fonts));
});

gulp.task('css', ['sass'], function () {

    console.log(update('\n--------- Running CSS tasks --------------------------------------------\n'));
    return gulp.src([src.css + '/**/*.css'])
        .pipe(gulpIf(production, plugins.minifyCss()))
        .pipe(plugins.concat('master.css'))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.css));
});

/*===========================================================
 GULP: APP TASKS :: Script -- js hint, uglify & concat
===========================================================*/

gulp.task('scripts', function () {

    console.log(update('\n--------- Running SCRIPT tasks -----------------------------------------\n'));
    return gulp.src([src.js + '/*.js', src.js + '/**/*.js'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(jshintStylish))
        .pipe(plugins.concat('application.js'))
        .pipe(gulpIf(production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.js));
});

/*===========================================================
 GULP: APP TASKS :: Images minification
===========================================================*/

gulp.task('img-min', function () {

    console.log(update('\n--------- Image Minification --------------------------------------------\n'));
    return gulp.src([src.images + '/*.*', src.images + '/**/*.*'])
        .pipe(plugins.imagemin())
        .pipe(plugins.size())
        .pipe(gulp.dest(build.images));
});

/*===========================================================
 GULP: APP TASKS :: Watch -- all files
===========================================================*/

gulp.task('watch', function () {

    console.log(update('\n--------- Watching All Files -------------------------------------------\n'));
    var HTML  = gulp.watch(['app/*.html', 'app/**/*.html'], ['html']),
        JS      = gulp.watch(['app/*.js', 'app/js/**/*.js'], ['scripts']),
        CSS     = gulp.watch(['app/*.css', 'app/css/**/*.css'], ['css']),
        SASS    = gulp.watch(['app/*.scss', 'app/scss/**/*.scss'], ['css']),
        FONTS   = gulp.watch(['app/fonts/*.*', 'app/fonts/**/*.*'], ['fonts']),
        IMG     = gulp.watch(['app/images/*.*', 'app/images/**/*.*'], ['img-min']),
        BOWER   = gulp.watch(['bower_components/**/*.*', 'bower_components/**/**', 'bower.json'], ['bundle-libraries']);

    var log = function (event) {
        if (event.type === 'deleted') {
            runSequence('clean');
            setTimeout(function () {
                runSequence('html', 'scripts', 'css', 'watch');
            }, 500);
        }
        console.log(update('\n--------- File ' + event.path + ' was ' + event.type + ' ------------------------\n'));
    };

    //on change print file name and event type
    HTML.once('update', log);
    CSS.once('update', log);
    SASS.once('update', log);
    JS.once('update', log);
    IMG.once('update', log);
    FONTS.once('update', log);
    BOWER.once('update', log);
});

/*==========================================================
 GULP: APP TASKS :: Bower file include
===========================================================*/
gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
        console.log(update('Bower installation completed'));
      cb(); // notify gulp that this task is finished
    });
});

gulp.task('bundle-libraries', ['bower'], function(){
  var bowerFile = require('./bower.json');
  var bowerPackages = bowerFile.dependencies;
  var bowerDir = './bower_components';
  var packagesOrder = [];
  var mainFiles = [];

  // Function for adding package name into packagesOrder array in the right order
  function addPackage(name){
    // package info and dependencies
    var info = require(bowerDir + '/' + name + '/bower.json');
    var dependencies = info.dependencies;

    // add dependencies by repeat the step
    if(!!dependencies){
      underscore.each(dependencies, function(value, key){
        if(exclude.indexOf(key) === -1){
          addPackage(key);
        }
      });
    }

    // and then add this package into the packagesOrder array if they are not exist yet
    if(packagesOrder.indexOf(name) === -1){
      packagesOrder.push(name);
    }
  }

  // calculate the order of packages
  underscore.each(bowerPackages, function(value, key){
    if(exclude.indexOf(key) === -1){ // add to packagesOrder if it's not in exclude
      addPackage(key);
    }
  });

  // get the main files of packages base on the order
  underscore.each(packagesOrder, function(bowerPackage){
    var info = require(bowerDir + '/' + bowerPackage + '/bower.json');
    var main = info.main;
    var mainFile = main;

    // get only the .js file if mainFile is an array
    if(underscore.isArray(main)){
      underscore.each(main, function(file){
        if(underscoreStr.endsWith(file, '.js')){
          mainFile = file;
        }
      });
    }

    // make the full path
    mainFile = bowerDir + '/' + bowerPackage + '/' + mainFile;

    // only add the main file if it's a js file
    if(underscoreStr.endsWith(mainFile, '.js')){
      mainFiles.push(mainFile);
    }
  });

  // run the gulp stream
  return gulp.src(mainFiles)
    .pipe(sourcemaps.init({loadMaps : true}))
    .pipe(plugins.concat('bower.js'))
    .pipe(gulpIf(production, plugins.uglify()))
    .pipe(gulpIf(production, sourcemaps.write('./')))
    .pipe(gulp.dest(build.js));
});

// TODO:: Add CSS and IMAGES include in build and remove this task
// gulp.task('bower-concat', function() {
//     var mainFiles = mainBowerFiles();

//     if(!mainFiles.length){
//         // No main files found. Skipping....
//         return;
//     }

//     var jsFilter = filterByExtension('js');

//     return gulp.src(mainFiles)
//         //For JS files
//         .pipe(jsFilter)
//         .pipe(sourcemaps.init({loadMaps : true}))
//         .pipe(concat('bower.js'))
//         .pipe(gulpIf(production, plugins.uglify()))
//         .pipe(gulpIf(production, sourcemaps.write('./')))
//         .pipe(gulp.dest(build.js))
//         .pipe(jsFilter.restore())

//          //For CSS files
//         .pipe(filterByExtension('css'))
//         .pipe(sourcemaps.init({loadMaps : true}))
//         .pipe(concat('bower.css'))
//         .pipe(gulpIf(production, plugins.uglify()))
//         .pipe(gulpIf(production, sourcemaps.write('./')))
//         .pipe(gulp.dest(build.css));
// });

/*==========================================================
 GULP: APP TASKS :: Browser sync to sync with browser
===========================================================*/

gulp.task('browser-sync', function () {
    browserSync.init([build.root + '*/*.*', build.root + '**/*.*'],
    {
        server : { baseDir : './build' }
    });
});

/*-----------------------------------------------------------
 GULP : ENVIRONMENT
 Set your environment here, as of now it's development and
 production. You can also include testing and staging
-----------------------------------------------------------*/
/*==========================================================
 GULP: ENVIRONMENT :: Gulp build Tasks - dev, production
===========================================================*/

gulp.task('build', function () {

    console.log(update('\n--------- Build Development Mode  --------------------------------------\n'));
    runSequence('html', 'scripts', 'css',  'bundle-libraries', 'img-min', 'fonts', 'server', 'watch');
});

gulp.task('prod', function () {

    console.log(update('\n--------- Build Production Mode  ---------------------------------------\n'));
    production = true;
    runSequence('html', 'scripts', 'css', 'bundle-libraries', 'img-min', 'fonts', 'server', 'watch');
});

/*==========================================================
 GULP: ENVIRONMENT :: Gulp Default Tasks -- build
===========================================================*/

gulp.task('default', ['build']);


/*-----------------------------------------------------------
 GULP : HELPERS
 Quick tasks to make your life easier!
-----------------------------------------------------------*/

// GULP: HELPERS :: List all gulp tasks
gulp.task('help', plugins.taskListing);

// GULP: HELPERS :: Clean - remove files and folder in build
gulp.task('clean', function () {
    console.log(update('\n--------- Clean:Build Folder ------------------------------------------\n'));

    del('build/', function (err) {
    console.log(update('All are files deleted from the build folder'));
    });
});

// GULP: HELPERS :: Zip all build files with date
gulp.task('zip', function () {
    var date = new Date().toDateString();

    console.log(update('\n--------- Zipping Build Files ------------------------------------------\n'));
    return gulp.src([build.root + '/**/*'])
        .pipe(plugins.zip('eruditus - ' + date + '.zip'))
        .pipe(plugins.size())
        .pipe(gulp.dest('./zip/'));
});
