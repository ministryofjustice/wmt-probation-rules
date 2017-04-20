var gulp = require('gulp')
var mocha = require('gulp-mocha')
var standard = require('gulp-standard')
var node

gulp.task('standard', function () {
  return gulp.src(['app/*.js', 'app/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('mocha', function () {
  return gulp.src(['test/**/*.js'], { read: false })
      .pipe(mocha({ reporter: 'spec' }))
})

gulp.task('test', ['standard', 'mocha'])
