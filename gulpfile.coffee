gulp = require 'gulp'
browserSync = require 'browser-sync'
react = require 'gulp-react'
dirs = ['app/*.html', 'app/*.json', 'app/build/*.js']

gulp.task 'browser-sync', ->
  browserSync.init null,
    notify: true
    browser: 'google chrome canary'
    server:
      baseDir: 'app'

gulp.task 'watch', ->
  gulp.watch dirs, browserSync.reload
  gulp.watch 'app/src/*.js', ['react']

gulp.task 'react', ->
  gulp.src 'app/src/*.js'
  .pipe react()
  .pipe gulp.dest('app/build')

gulp.task 'default', ['browser-sync', 'watch']
