'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')
const webserver = require('gulp-webserver');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const closureCompiler = require('google-closure-compiler').gulp();

// Config

const source = {
    root: 'src',
    indexes: 'src/examples/*.html',
    styles: 'src/sass/**/*.scss',
    scripts: 'src/js/**/*.js',
    mainStyle: 'src/sass/styles.scss'
};

const dist = {
    root:'dist',
    styles: 'dist/css',
    scripts: 'dist/js'
};

const server = {
    host: 'localhost',
    port: 5000
};

const compilerOptions = {
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    warning_level: 'VERBOSE',
    dependency_mode: 'LOOSE',
    language_in: 'ECMASCRIPT6_STRICT',
    language_out: 'ECMASCRIPT5_STRICT',
    output_wrapper: '(function(){\n%output%\n})();',
    js_output_file: 'roanoke.min.js'
};

const testCompilerOptions = {
    compilation_level: 'SIMPLE_OPTIMIZATIONS',
    warning_level: 'VERBOSE',
    dependency_mode: 'LOOSE',
    language_in: 'ECMASCRIPT6_STRICT',
    language_out: 'ECMASCRIPT5_STRICT',
    output_wrapper: '(function(){\n%output%\n})();',
    js_output_file: 'roanoke.js'
};

// Tasks

gulp.task('compile-js', () => {
    return gulp.src(source.scripts, {base: './'})
        .pipe(plumber())
        .pipe(closureCompiler(compilerOptions))
        .pipe(gulp.dest(dist.scripts));
});

gulp.task('compile-js-test', () => {
    return gulp.src(source.scripts, {base: './'})
        .pipe(plumber())
        .pipe(closureCompiler(testCompilerOptions))
        .pipe(gulp.dest(dist.scripts));
});

gulp.task('test', ['compile-js-test'], () => {
    return gulp.src('test/runner.html')
        .pipe(mochaPhantomJS());
});

gulp.task('sass', () => {
    return gulp.src(source.mainStyle)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(dist.styles));
});

gulp.task('webserver', () => {
    return gulp.src(dist.root)
        .pipe(webserver({
            host: server.host,
            port: server.port,
            directoryListing: true
        }));
});

gulp.task('copy', () => {
    return gulp.src(source.indexes)
        .pipe(plumber())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(`${dist.root}`));
});

gulp.task('copy-test', () => {
    return gulp.src('test/runner.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
    gulp.watch(source.styles, ['build']);
    gulp.watch(source.indexes, ['build']);
    gulp.watch(source.scripts, ['build']);
});

gulp.task('build', ['compile-js', 'sass', 'copy']);
gulp.task('default', ['build', 'webserver', 'watch']);
