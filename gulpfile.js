'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const webpack = require('webpack');
const path = require('path');
const mocha = require('gulp-mocha');

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
    scripts: '.tmp/js'
};

const server = {
    host: 'localhost',
    port: 5000
};

const webpackConfig = {
    entry: './.tmp/js/roanoke.js',
    output: {
        path: path.join(__dirname, 'dist', 'js'),
        publicPath: 'dist/js',
        filename: 'roanoke.pack.min.js'
    }
};

// Tasks

gulp.task('babel', () => {
    return gulp.src(source.scripts)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(dist.scripts));
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

gulp.task('test', ['webpack'], () => {
    return gulp.src('test/test.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
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
