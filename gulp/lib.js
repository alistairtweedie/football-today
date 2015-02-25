var gulp = require('gulp'),
	concat = require('gulp-concat');

gulp.task('lib', function () {
	gulp.src([__dirname + '/../client/src/lib/bootstrap/dist/css/bootstrap.css'])
		.pipe(gulp.dest(__dirname + '/../public/styles/lib/'));

	gulp.src([__dirname + '/../client/src/lib/bootstrap/fonts/*'])
		.pipe(gulp.dest(__dirname + '/../public/styles/fonts/'));

	gulp.src([__dirname + '/../client/src/lib/font-awesome/fonts/*'])
		.pipe(gulp.dest(__dirname + '/../public/styles/fonts/'));

	gulp.src([__dirname + '/../client/src/lib/font-awesome/css/font-awesome.css'])
		.pipe(gulp.dest(__dirname + '/../public/styles/lib/'));

	return gulp.src([__dirname + '/../client/src/lib/angular/angular.js',
	 	__dirname + '/../client/src/lib/angular-ui-router/release/angular-ui-router.js',
	 	__dirname + '/../client/src/lib/angular-resource/angular-resource.js'])
		.pipe(concat('angular_all.js'))
		.pipe(gulp.dest(__dirname + '/../public/js/lib'))
		.on('error', function (error) {
	        console.error(String(error));
	    });
});
