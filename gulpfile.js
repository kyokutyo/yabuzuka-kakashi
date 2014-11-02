var gulp = require('gulp');
var browserSync = require('browser-sync');
var react = require('gulp-react');
var dirs = ['app/*.html', 'app/*.json', 'app/build/*.js'];

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        notify: true,
        browser: 'google chrome canary',
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(dirs, browserSync.reload);
    gulp.watch('app/src/*.js', ['react']);
});

gulp.task('react', function () {
    gulp.src('app/src/*.js')
        .pipe(react())
        .pipe(gulp.dest('app/build'));
});

gulp.task('default', ['browser-sync', 'watch']);
