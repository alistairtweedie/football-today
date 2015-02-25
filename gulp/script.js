var gulp = require('gulp'),
	concat = require('gulp-concat'),
	eslint = require('gulp-eslint');


var eslintConf = {
        rulePaths: [],
        rules: {
            'quotes': [2, 'single'],
            'strict': 0,
            'global-strict': 0
        },
        globals: {
            'angular':true
        },
        envs: [
            'browser'
        ]
    };


gulp.task('script', function() {
	return gulp.src([__dirname + '/../client/src/**.*.app.js', __dirname + '/../client/src/**/*.js', '!' + __dirname + '/../client/src/lib/**/*.js'])
        .pipe(eslint(eslintConf))
        .pipe(eslint.format())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(__dirname + '/../public/js'))
		.on('error', function (error) {
            console.error(String(error));
        });
});
