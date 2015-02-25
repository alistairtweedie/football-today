var gulp = require('gulp');

gulp.task('assets', function() {
	return gulp.src(__dirname + '/../client/src/assets/**/*.*')
		.pipe(gulp.dest(__dirname + '/../public/assets/'))
		.on('error', function (error) {
            console.error(String(error));
        });
});