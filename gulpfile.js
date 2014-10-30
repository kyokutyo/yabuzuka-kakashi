var gulp = require('gulp');
var webserver = require('gulp-webserver');
var react = require('gulp-react');

gulp.task('webserver', function() {
    return gulp.src('app')
    .pipe(webserver({
        livereload: true,
    }));
});

gulp.task('watch', function () {
    return gulp.watch('app/src/*.js', ['build-react']);
});

gulp.task('build-react', function () {
    return gulp.src('app/src/*.js')
    .pipe(react())
    .pipe(gulp.dest('app/build'));
});

gulp.task('default', ['webserver', 'watch']);
