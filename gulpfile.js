var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var changed = require('gulp-changed');
var streamqueue = require('streamqueue');

var config ={
    scripts : [
        './public/js/**/*.module.js',
        './public/js/**/*.service.js',
        './public/js/**/*.factory.js',
        './public/js/**/*.constant.js',
        './public/js/**/*.controller.js',
        './public/js/**/*.config.js'
    ],
    dest: './public/build/',
    minJs: 'app.min.js',
    fatJS: 'app.js'
};

gulp.task('prod', function() {
    return gulp.src(config.scripts)
        .pipe(changed(config.dest))
        .pipe(uglify())
        .pipe(concat(config.minJs))
        .pipe(gulp.dest(config.dest));
});

gulp.task('dev', function() {
    return gulp.src(config.scripts)
        .pipe(changed(config.dest))
        .pipe(concat(config.fatJS))
        .pipe(gulp.dest(config.dest));
});

gulp.task('watch', function(){
    gulp.watch(config.scripts, ['dev']);
});