var gulp = require('gulp');
require('./clean');
require('./script');
require('./html');
require('./styles');
require('./assets');
require('./lib');
require('./watch');
require('./bower');

gulp.task('buildOnce', ['clean', 'bower', 'lib', 'script', 'html', 'styles', 'assets']);
gulp.task('build', ['buildOnce', 'watch']);
