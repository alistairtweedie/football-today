var gulp = require('gulp'),
	buildBranch = require('gulp-build-branch'),
	git = require('gulp-git');
	require('./build');


gulp.task('deploy', ['commitToGHPages'], function() {
  return git.push('github', 'gh-pages', function (err) {
    if (err) throw err;
  });
});

gulp.task('commitToGHPages', ['buildOnce'], function() {
  return buildBranch({ folder: 'public', branch: 'gh-pages' });
});


