const gulp = require('gulp')
const mocha = require('gulp-mocha')
const standard = require('gulp-standard')

gulp.task('standard', function () {
  return gulp.src([
    'app/**/*.js'
  ])
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

gulp.task('test', gulp.series('standard', 'mocha'))
