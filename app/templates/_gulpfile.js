'use strict';
/*-----------------------------------------------------------
GULP: DEPENDENCIES DEFINTION
-----------------------------------------------------------*/
var gulp = require('gulp'),
    del = require('del'),
    open = require('open'),
    chalk = require('chalk'),
    gulpIf = require('gulp-if'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    bower = require('main-bower-files'),
	browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    jshintStylish = require('jshint-stylish'),
    fileInclude = require('gulp-file-include'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();

/*-----------------------------------------------------------
GULP: CONFIGURATION
-----------------------------------------------------------*/
// Source Path
var src = {
    root : 'app',
    css : 'app/css',
    scss : 'app/scss',
    js : 'app/js',
    images : 'app/images',
    fonts : 'app/fonts',
    bower : './bower_components',
    zip : './zip'
};

// Build Path
var build = {
    root : 'build',
    css : 'build/css',
    js : 'build/js',
    images : 'build/images',
    fonts : 'build/fonts'
};

// Server Configuration
var serverConfiguration = {
    host : 'localhost',
    port : 3000,
    livereload: true,
    open: true
};

// Default production mode set to false
var production = false;

// Bower Configuration
var bowerConfiguration = {
    paths: {
        bowerDirectory: src.bower,
        bowerrc: '.bowerrc',
        bowerJson: 'bower.json'
    }
};

// Minification options for HTML
var opts = {
    comments: false,
    quotes: true,
    spare: true,
    empty: true,
    cdata: true
};

// Chalk config
var error = chalk.red.bold,
    warning = chalk.yellow.bold,
    update = chalk.blue,
    sucess = chalk.green;

/*-----------------------------------------------------------
GULP: TASKS
-----------------------------------------------------------*/
/*-----------------------------------------------------------
GULP: TASKS :: List all gulp tasks
-----------------------------------------------------------*/

gulp.task('help', plugins.taskListing);

/*-----------------------------------------------------------
GULP: TASKS :: Start server and live reload
-----------------------------------------------------------*/

gulp.task('server', function () {

    console.log(hint('\n --------- Server started at http://localhost:'+ serverConfig.port +' ------------------------ \n'));
    return gulp.src('build')
        .pipe(plugins.webserver(serverConfig));
});

/**================================================
GULP: TASKS :: HTML -- minify html to build
===================================================*/

gulp.task('html', function () {

    console.log(hint('\n --------- Running HTML tasks ------------------------------------------ \n '));
    return gulp.src([src.root + '/*.html', src.root + '/**/*.html'])
        .pipe(gulpif(production, plugins.minifyHtml(opts)))
        .pipe(plugins.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.root));
});


//  TODO ::::::::::::::
/**===============================================
        CSS & SASS Tasks -- minify, concat
=================================================*/

var callback = function (err) {
    console.log(error('\n SASS file has error clear it to see changes, see below log ------------->>> \n'));
    console.log(error(err));
};

gulp.task('sass', function () {

    console.log(hint('\n --------- Running SASS tasks ------------------------------------------->>>'));
    return gulp.src([src.css + '/app.scss'])
        .pipe(plugins.sass({ onError: callback }))
        .pipe(plugins.size())
        .pipe(gulp.dest(src.sass));
});

gulp.task('fonts', function () {

    console.log(hint('\n --------- Running Fonts tasks -------------------------------------------->>>'));
    return gulp.src([src.fonts + '/*.*', src.fonts + '/**/*.*'])
        .pipe(plugins.size())
        .pipe(gulp.dest(build.fonts));
});

gulp.task('css', ['sass', 'fonts'], function () {

    console.log(hint('\n --------- Running CSS tasks -------------------------------------------->>>'));
    return gulp.src([src.css + '/**/*.css', src.sass + '/app.css'])
        .pipe(gulpif(production, plugins.minifyCss()))
        .pipe(plugins.concat('styles.css'))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.css));
});









/*-----------------------------------------------------------
GULP: TASKS :: SCSS to CSS Compiler
-----------------------------------------------------------*/
gulp.task('sass', function () {
    gulp.src(['app/scss/master.scss'])
        .pipe(sass({includePaths: ['scss']}))
        //.pipe(sass({errLogToConsole: true}))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('./app/css/'));
});

/*-----------------------------------------------------------
GULP: TASKS :: Browser Sync live changes
-----------------------------------------------------------*/
gulp.task('browser-sync', function() {
    browserSync.init(["app/css/*.css", "app/js/*.js"], {
        server: {
            baseDir: "./app"
        }
    });
});

/*-----------------------------------------------------------
GULP: TASKS :: File include brings partials support
-----------------------------------------------------------*/
gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

/*-----------------------------------------------------------
GULP: TASKS :: File include brings partials support
-----------------------------------------------------------*/
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("app/scss/*.scss", ['sass']);
});
