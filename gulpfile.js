(function() {
    var gulp = require('gulp'),

    // SCSS, CSS & MINIFICATION
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    plumber = require('gulp-plumber'),
    prettyData = require('gulp-pretty-data'),

    // JS
    uglify = require('gulp-uglify'),

    // ANGULARJS
    ngAnnotate = require('gulp-ng-annotate'),

    // UTILITIES
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sequence = require('run-sequence'),

    // SERVER & LIVE BROWSER RELOAD
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,

    basePaths = {
        src: "./src/",
        build: "./dist/",
        bower: "./bower_components/",
        app: "./app/",
        public: "./"
    },
    paths = {};

    // USED DIRECTORIES
    paths = {
        scss: {
            compass: {
                css: basePaths.src + "css",
                sass:  basePaths.src + "scss"
            },
            src: basePaths.src + "scss/**/*.scss",
            dest: basePaths.build + "css/"
        },
        css: {
            name: "build.css",
            src: [
                basePaths.bower + "bootstrap/dist/css/bootstrap.min.css",
                basePaths.bower + "font-awesome/css/font-awesome.min.css",
                basePaths.build + "css/layout.css",
                basePaths.build + "css/mk-spinners.css",
            ],
            dest: basePaths.build + "css/"
        },
        js: {
            name: "build.js",
            src: [
                basePaths.src + "js/run_prettify.js",
                basePaths.bower + "clipboard/dist/clipboard.min.js",
                basePaths.bower + "angular/angular.min.js",
                basePaths.app + "app.js"
            ],
            dest: basePaths.build + "js/"
        },
        fonts: {
            base: "",
            src: [
                basePaths.bower + "font-awesome/fonts/**"
            ],
            dest: basePaths.build + "fonts/"
        }
    };

    // CLEANS THE BUILD DIRECTORY
    gulp.task('clean', function(cb) {
        return gulp.src(basePaths.build, { read: false })
            .pipe(rimraf({
                force: true
            }));
    });

    // COPIES FONT IN BUILD
    gulp.task('copy:fonts', function() {
        return gulp.src(paths.fonts.src, {
            base: paths.fonts.base
        })
        .pipe(gulp.dest(paths.fonts.dest));
    });

    // SCSS WATCHER & COMPILER

    var prefixOptions = {
        // browsers: ['last 2 versions']
    };

    var cssnanoOptions = {
        discardComments: {
            removeAll: true
        },
        minifySelectors: true
    };

    var processors = [
      autoprefixer(prefixOptions),  // ADDS CSS PREFIXES
      cssnano(cssnanoOptions) // MINIFIES
    ];


    gulp.task('build:scss', function() {
        return gulp.src(paths.scss.src)
            .pipe(plumber())
            .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
            .pipe(postcss(processors))
            .pipe(rename(function (path) {
              path.basename += ".min";
            }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(paths.scss.dest))
            .pipe(prettyData({type: 'prettify'}))
            .pipe(rename(function (path) {
              path.basename = path.basename.replace(".min", "");
            }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(paths.scss.dest));
    });

    gulp.task('build:css', ["build:scss"], function(){
        return gulp.src(paths.css.src)
            .pipe(concat(paths.css.name))
            .pipe(postcss(processors))
            .pipe(gulp.dest(paths.css.dest))
            .pipe(browserSync.reload({ stream: true }));
    });

    gulp.task('build:js', function(){
        return gulp.src(paths.js.src)
            .pipe(plumber())
            .pipe(concat(paths.js.name))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(plumber.stop())
            .pipe(gulp.dest(paths.js.dest))
            .pipe(browserSync.reload({ stream: true }));
    });

    // BUILD FILE STRUCTURE
    gulp.task('build', function(cb){
        sequence(
            'clean',
            ['copy:fonts', 'build:js', 'build:css'],
        cb);
    });

    // WATCH FILES
    gulp.task('watch', function(){

      gulp.watch(paths.scss.src, ['build:css']);
      gulp.watch(paths.js.src, ['build:js']);
      gulp.watch("**/*.html").on("change", reload);

    });

    // STATIC SERVER
    gulp.task('server', ['build'], function() {
        browserSync.init({
            server: {
                baseDir: basePaths.public
            }
        });
    });

    // START SERVER
    gulp.task('default', ["server" , "watch"]);

})();
