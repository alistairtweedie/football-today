var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	recess = require('gulp-recess');

gulp.task('styles', function() {
	return gulp.src(__dirname + '/../client/src/less/**/*.less')
		/*.pipe(recess())
        .pipe(recess.reporter())
		.on('error', function (error) {
	        console.error(String(error));
        })*/
		.pipe(less())
		.pipe(concat('core.css'))
		.pipe(gulp.dest(__dirname + '/../public/styles/'));

});