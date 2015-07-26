var gulp = require('gulp');

gulp.task('watch', function () {
	gulp.watch(__dirname + '/../client/src/js/**/*.js', ['script']);
	gulp.watch(__dirname + '/../client/src/**/*.html', ['html']);
	gulp.watch(__dirname + '/../client/src/less/**/*.less', ['stylesOld']);
	gulp.watch(__dirname + '/../client/src/scss/**/*.scss', ['styles']);
	gulp.watch(__dirname + '/../client/src/assets/*', ['assets']);
});
