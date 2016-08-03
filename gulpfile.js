(function() {
    var gulp = require('gulp'),

    // SCSS, CSS & MINIFICATION 
    compass = require('gulp-compass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    uncss = require('gulp-uncss'),

    // JS & JS MINIFICATION
    jslint = require('jslint'),
    uglify = require('gulp-uglify'),

    // ANGULARJS
    ngAnnotate = require('gulp-ng-annotate'),
    
    // UTILITIES
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    rimraf = require('rimraf'),
    sequence = require('run-sequence'),

    // SERVER & LIVE BROWSER RELOAD
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    
    basePaths = {
        client: "./assets/",
        build: "./build/",
        production: "./src/",
        bower: "./bower_components/"
    },
    paths = {};

    // USED DIRECTORIES
    paths = {
        scss: {
            compass: {
                css: "assets/css",
                sass: "assets/scss"
            },
            src: [
                basePaths.client + "scss/**/*.scss"
            ],
            dest: {
                css: basePaths.client + "css/",
                build: basePaths.build + "css/"
            },
            production: basePaths.production
        },
        css: {
            name: "build.css",
            appFile:  basePaths.client + "css/mk-spinners.css",
            src: [
                basePaths.bower + "bootstrap/dist/css/bootstrap.min.css",
                basePaths.bower + "font-awesome/css/font-awesome.min.css",
                basePaths.client + "css/mk-spinners.css"
            ],
            dest: basePaths.build + "css/"
        },
        js: {
            name: "build.js",
            src: [
                basePaths.client + "js/run_prettify.js",
                basePaths.bower + "clipboard/dist/clipboard.min.js",
                basePaths.bower + "angular/angular.min.js",
                "./app/app.js"
            ],
            dest: basePaths.build + "js/"
        },
        font: {
            base: "",
            fonts: {
                src: [
                    basePaths.bower + "font-awesome/fonts/**"
                ],
                dest: basePaths.build + "fonts/"
            }
        },
        copy: {
            base: basePaths.client,
            build: basePaths.build,
            folders: {
                css: basePaths.client + "css/**",
                js: basePaths.client + "js/**",
                images: basePaths.client + "images/**",
                fonts: basePaths.client + "fonts/**",
                data: basePaths.client + "data/**"
            }
        }
    };





    // STATIC SERVER
    gulp.task('server', function() {
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
    });




    // CLEANS THE BUILD DIRECTORY
    gulp.task('clean', function(cb) {
        console.log("CLEAN");
        rimraf(paths.copy.build, cb);
    });





    // COPIES FONT FOR DEVELOPMENT
    gulp.task('clean:font:build', function(cb) {
        console.log("CLEAN FONT");
        rimraf(paths.font.fonts.dest, cb);
    });





    // COPIES CSS IN BUILD
    gulp.task('copy:css', function() {
        return gulp.src(paths.copy.folders.css, {
            base: paths.copy.base
        })
        .pipe(gulp.dest(paths.copy.build));
    });





    // COPIES FONT IN BUILD
    gulp.task('copy:font:build', function() {
        return gulp.src(paths.font.fonts.src, {
            base: paths.font.base
        })
        .pipe(gulp.dest(paths.font.fonts.dest));
    });





    // SCSS WATCHER & COMPILER
    gulp.task('compass', function() {
        return gulp.src(paths.scss.src)
            .pipe(compass({
                css: paths.scss.compass.css,
                sass: paths.scss.compass.sass,
                require: ['compass', 'breakpoint', 'singularitygs'],
                style: 'expanded'
            }))
            .pipe(gulp.dest(paths.scss.dest.css));
    });


    
    gulp.task('css:build', function(){
        console.log(paths.css.src);
        return gulp.src(paths.css.src)
            .pipe(concat(paths.css.name))
            .pipe(uncss({
                ignoreSheets: ["./assets/css/mk-spinners.css"],
                html: [
                    "http://localhost:3000/"
                ]
            }))
            .pipe(cleanCSS({ keepSpecialComments : 0 }))
            .pipe(gulp.dest(paths.css.dest));
    });






    gulp.task('css:production', function(){
        return gulp.src(paths.css.appFile)
            .pipe(gulp.dest(paths.scss.production))
            .pipe(rename(function (path) {
                path.basename += ".min";
            }))
            .pipe(cleanCSS({ keepSpecialComments : 0 }))
            .pipe(gulp.dest(paths.scss.production));
    });



    gulp.task('js:build', function(){
        return gulp.src(paths.js.src)
            .pipe(concat(paths.js.name))
            .pipe(uglify())
            .pipe(gulp.dest(paths.js.dest));
    });



    // BUILD FILE STRUCTURE

    gulp.task('build', function(cb){
        sequence(['clean', 'clean:font:build'], ['copy:font:build'], 'js:build', 'compass', 'css:build', 'css:production', cb);
    });






    // START SERVER
    gulp.task('default', function(){

        sequence('build', 'server');

        gulp.watch(paths.scss.src, function(cb){
            sequence('compass', 'copy:css', cb);
        });
        
        gulp.watch("**/*.html").on("change", reload);

    });





})();