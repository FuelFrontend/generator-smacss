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
    bowerFiles = require('main-bower-files'),
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
    success = chalk.green;

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

    console.log(update('\n --------- Server started at http://localhost:'+ serverConfiguration.port +' ------------------------ \n'));
    return gulp.src('build')
        .pipe(plugins.webserver(serverConfiguration));
});

/**================================================
GULP: TASKS :: HTML -- minify html to build
===================================================*/

gulp.task('html', function () {

    console.log(update('\n --------- Running HTML tasks ------------------------------------------ \n '));
    return gulp.src([src.root + '/*.html', src.root + '/**/*.html'])
        .pipe(gulpIf(production, plugins.minifyHtml(opts)))
        .pipe(plugins.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.root));
});

/**================================================
GULP: TASKS :: CSS & SASS -- minify, concat
===================================================*/

var callback = function (err) {
    console.log(error('\n SASS file has error clear it to see changes, check the log below ------------- \n'));
    console.log(error(err));
};

gulp.task('sass', function () {

    console.log(update('\n --------- Running SASS tasks -------------------------------------------'));
    return gulp.src(['app/scss/master.scss'])
        .pipe(plugins.sass({ onError: callback }))
        .pipe(plugins.size())
        .pipe(gulp.dest(src.css));
});

gulp.task('fonts', function () {

    console.log(update('\n --------- Running Fonts tasks --------------------------------------------'));
    return gulp.src([src.fonts + '/*.*', src.fonts + '/**/*.*'])
        .pipe(plugins.size())
        .pipe(gulp.dest(build.fonts));
});

gulp.task('css', ['sass', 'fonts'], function () {

    console.log(update('\n --------- Running CSS tasks --------------------------------------------'));
    return gulp.src([src.css + '/**/*.css'])
        .pipe(gulpIf(production, plugins.minifyCss()))
        .pipe(plugins.concat('master.css'))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.css));
});

/**================================================
GULP: TASKS :: Script -- js hint & uglify & concat
===================================================*/

gulp.task('scripts', function () {

    console.log(update('\n --------- Running SCRIPT tasks -----------------------------------------'));
    return gulp.src([src.js + '/*.js', src.js + '/**/*.js'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(jshintStylish))
        .pipe(plugins.concat('application.js'))
        .pipe(gulpIf(production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.js));
});

/**================================================
        Concat - all bower packages
===================================================*/

gulp.task('concat-bower', function () {

    console.log(update('\n --------- Bower Concat ------------------------------------------------->>> \n'));
    var jsFilter   = plugins.filter('**/*.js'),
        cssFilter  = plugins.filter('**/*.css'),
        fontsFilter = plugins.filter(['**/fonts/**.*']);

    //for js files
    return gulp.src(bowerFiles(bowerConfiguration), { base : './bower_components'})
        .pipe(jsFilter)
        .pipe(plugins.concat('bower.js'))
        .pipe(gulpIf(production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.js))
        .pipe(jsFilter.restore())

        //for css files
        .pipe(cssFilter)
        .pipe(plugins.concat('bower.css'))
        .pipe(gulpIf(production, plugins.uglify()))
        .pipe(plugins.size())
        .pipe(gulp.dest(build.css))
        .pipe(cssFilter.restore())

        //for font files
        .pipe(fontsFilter)
        .pipe(plugins.size())
        .pipe(plugins.rename({dirname: ''}))
        .pipe(gulp.dest(build.fonts))
        .pipe(fontsFilter.restore());
});


/**================================================
            Images minification
===================================================*/

gulp.task('img-min', function () {

    console.log(update('\n --------- Image Minification -------------------------------------------- \n'));
    return gulp.src([src.images + '/*.*', src.images + '/**/*.*'])
        .pipe(plugins.imagemin())
        .pipe(plugins.size())
        .pipe(gulp.dest(build.images));
});

/**===============================================
        Watch -- all files
=================================================*/

gulp.task('watch', function () {

    console.log(update('\n --------- Watching All Files ------------------------------------------- \n'));
    var HTML  = gulp.watch(['app/*.html', 'app/**/*.html'], ['html']),
        JS      = gulp.watch(['app/*.js', 'app/js/**/*.js'], ['scripts']),
        CSS     = gulp.watch(['app/*.css', 'app/css/**/*.css'], ['css']),
        SASS    = gulp.watch(['app/*.scss', 'app/scss/**/*.scss'], ['css']),
        FONTS   = gulp.watch(['app/fonts/*.*', 'app/fonts/**/*.*'], ['fonts']),
        IMG     = gulp.watch(['app/images/*.*', 'app/images/**/*.*'], ['img-min']),
        BOWER   = gulp.watch(['bower_components/**/*.*', 'bower_components/**/**', 'bower.json'], ['concat-bower']);

    var log = function (event) {
        if (event.type == 'deleted') {
            runSequence('clean');
            setTimeout(function () {
                runSequence('html', 'scripts', 'css', 'watch');
            }, 500);
        }
        console.log(change('\n -- File ' + event.path + ' was ' + event.type + ' -->>>'));
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

/**================================================
        Clean - remove files and folder in build
===================================================*/

gulp.task('clean', function () {
    console.log(update('\n --------- Clean:Build Folder ------------------------------------------>>> \n'));

    del('build/', function (err) {
    console.log(update('All are files deleted from the build folder'));
    });
});

/**================================================
        Browser sync to sync with browser
==================================================*/

gulp.task('browser-sync', function () {
    browserSync.init([build.root + '*/*.*', build.root + '**/*.*'],
    {
        server : { baseDir : './build' }
    });
});

/**================================================
        Zip all build files with date
==================================================*/

gulp.task('zip', function () {
    var date = new Date().toDateString();

    console.log(update('\n --------- Zipping Build Files ------------------------------------------>>> \n'));
    return gulp.src([build.root + '/**/*'])
        .pipe(plugins.zip('<%= site_name %> - ' + date + '.zip'))
        .pipe(plugins.size())
        .pipe(gulp.dest('./zip/'));
});

/**===============================================
        Gulp build Tasks - dev, production
=================================================*/

gulp.task('build', function () {

    console.log(update('\n --------- Build Development Mode  -------------------------------------->>> \n'));
    runSequence('html', 'scripts', 'css',  'img-min', 'concat-bower', 'server', 'watch');
});

gulp.task('prod', function () {

    console.log(update('\n --------- Build Production Mode  --------------------------------------->>> \n'));
    production = true;
    runSequence('html', 'scripts', 'css', 'img-min', 'concat-bower', 'server', 'watch');
});


/**==============================================
        Gulp Default Tasks -- build
=================================================*/

gulp.task('default', ['build']);