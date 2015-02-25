var gulp = require('gulp');

gulp.task('html', function() {
	return gulp.src(__dirname + '/../client/src/**/*.html')
		.pipe(gulp.dest(__dirname + '/../public/'));
});