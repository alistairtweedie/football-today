var gulp = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');

gulp.task('styles',  function() {
  return gulp.src(__dirname + '/../client/src/scss/site.scss')
        .pipe(sass())
          .pipe(prefix())
          .pipe(gulp.dest(__dirname + '/../public/styles'))
          .pipe(minifyCSS())
          .pipe(rename('site.min.css'))
          .pipe(gulp.dest(__dirname + '/../public/styles/'));
});
