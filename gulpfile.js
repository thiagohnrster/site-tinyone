var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');

gulp.task('less', function() {
	return gulp.src('./styles/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./styles/css'));
});

gulp.task('default', ['less']);