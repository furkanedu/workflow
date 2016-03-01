var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-ruby-sass");
var browserSync = require('browser-sync').create();
var imagemin = require("gulp-imagemin");

// minify js
gulp.task("scripts",function(){
	gulp.src("pre-build/js/**/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("build/js"));
});

// sass compiling 
gulp.task('styles', function() {
 return sass('pre-build/scss/**/*.scss', {
  	style: 'compressed'
 })
  .pipe(gulp.dest('build/css'));
});﻿

// image task
gulp.task("image",function(){
	gulp.src("pre-build/img/**/*")
	.pipe(imagemin())
	.pipe(gulp.dest("build/img"));
});

// auto reload code
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("pre-build/scss/**/*.scss", ['styles']);
    gulp.watch("pre-build/js/**/*.js",["scripts"]);
    gulp.watch("./build/css/**/*.css").on('change', browserSync.reload);
    gulp.watch("./build/js/**/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// watch 
gulp.task("watch", function(){
	//gulp.watch("pre-build/js/**/*.js",["scripts"]);
	//gulp.watch("scss/**/*.scss",["styles"]);
});

gulp.task("default" , ["scripts","styles","image","serve","watch"]);