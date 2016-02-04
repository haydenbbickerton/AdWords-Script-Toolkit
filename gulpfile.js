'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
    return browserify('./src/bootstrap.js')
        .bundle()
        .pipe(source('entry.js'))
        .pipe(gulp.dest('./build/'));
});