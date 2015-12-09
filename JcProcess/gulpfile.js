var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	notify = require('gulp-notify');

gulp.task('scripts',function(){
  gulp.src('JcProgressBar.js')
    .pipe(uglify())
    .pipe(rename('JcProgressBar.min.js'))
    .pipe(gulp.dest('./'))
});

gulp.watch('./JcProgressBar.js', ['js']);

gulp.task('default', ['js']);