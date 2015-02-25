var gulp = require('gulp'),
	server = require('gulp-server-livereload');
require('./gulp/build');

gulp.task('server', function() {
  gulp.src('public')
    .pipe(server({
      livereload: true,
      port: 8000
    }));
});

