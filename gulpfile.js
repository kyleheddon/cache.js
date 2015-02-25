var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test', function () {
	gulp.src('./tests/**/*_test.js').pipe(jasmine());
});

gulp.task('default', ['test']);
