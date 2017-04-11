'use strict';

const gulp = require('gulp');
const debug = require('gulp-debug');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const webpack = require('webpack');
const path = require('path');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const istanbul = require('gulp-babel-istanbul');
const isparta = require('isparta');

// Config

const source = {
    root: 'src',
    indexes: 'src/examples/*.html',
    styles: 'src/sass/**/*.scss',
    scripts: 'src/js/**/*.js',
    mainStyle: 'src/sass/styles.scss',
    tests: 'test/**/*.js'
};

const dist = {
    root:'dist',
    styles: 'dist/css',
    scripts: '.tmp/js',
    tests: '.tmp/test'
};

const server = {
    host: 'localhost',
    port: 5000
};

const webpackConfig = {
    entry: './.tmp/js/roanoke.js',
    output: {
        path: path.join(__dirname, '.tmp', 'js'),
        filename: 'roanoke.pack.js'
    }
};

const testWebpackConfig = {
    entry: './.tmp/test/test.js',
    output: {
        path: path.join(__dirname, '.tmp', 'test'),
        filename: 'test.pack.js'
    }
};

// Tasks

gulp.task('babel', () => {
    return gulp.src(source.scripts)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(dist.scripts));
});

gulp.task('babel-test', () => {
    return gulp.src(source.tests)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(dist.tests));
});

gulp.task('webpack', ['babel'], (callback) => {
    webpackConfig.plugins = [
        new webpack.optimize.UglifyJsPlugin()
    ];

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});

gulp.task('webpack-test', ['webpack', 'babel-test'], (callback) => {
    webpack(testWebpackConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack-test', err);
        }

        gutil.log('[webpack-test]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});

gulp.task('pre-coverage', ['webpack-test'], () => {
    return gulp.src('.tmp/js/**/*.js')
        .pipe(debug())
        .pipe(plumber())
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter
            //includeUntested: true
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('coverage', ['pre-coverage'], () => {
    return gulp.src('test/runner.html')
        .pipe(mochaPhantomJS())
        .pipe(istanbul.writeReports());
});

gulp.task('test', ['webpack-test'], () => {
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

gulp.task('watch', () => {
    gulp.watch(source.styles, ['build']);
    gulp.watch(source.indexes, ['build']);
    gulp.watch(source.scripts, ['build']);
});

// gulp.task('clean', () => {
//     return gulp.src(dist.root, {read: false})
//         .pipe(clean());
// });

gulp.task('build', ['webpack', 'sass', 'copy']);
gulp.task('default', ['build', 'webserver', 'watch']);
