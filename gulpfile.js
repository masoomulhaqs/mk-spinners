(function() {
    var gulp = require('gulp'),

    compass = require('gulp-compass'),
    cleanCSS = require('gulp-clean-css'),
    cssShorthand = require('gulp-shorthand'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    dedupe = require('gulp-dedupe'),

    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

    // Static server
    gulp.task('server', function() {
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
        gulp.watch("assets/scss/**/*.scss", ['compass']);
        gulp.watch("*.html").on("change", reload);
    });

    // SCSS Watcher & Compiler
    gulp.task('compass', function() {
        return gulp.src('assets/scss/**/*.scss')
            .pipe(compass({
                css: 'assets/css',
                sass: 'assets/scss',
                require: ['compass', 'breakpoint', 'singularitygs'],
                style: 'expanded'
            }))
            .pipe(gulp.dest('assets/css'))
            .pipe(gulp.dest('src'))
            .pipe(concat('mk-spinners.min.css'))
            .pipe(cleanCSS())
            .pipe(gulp.dest('src'));
    });

    gulp.task('default', ['server', 'compass']);
})();