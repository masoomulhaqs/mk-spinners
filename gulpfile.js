(function() {
    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var reload      = browserSync.reload;

    // Static server
    gulp.task('server', function() {
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
        gulp.watch("*.html").on("change", reload);
    });

    // SCSS Watcher & Compiler

    gulp.task('default', ['server']);
})();