'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');
const rename = require('gulp-rename');

// Config

const source = {
    root: 'src',
    indexes: 'src/**/*.html',
    styles: 'src/sass/**/*.scss',
    mainStyle: 'src/sass/styles.scss'
};

const dist = {
    root:'dist',
    styles: 'dist/css'
};

const server = {
    host: 'localhost',
    port: 5000
};

// Tasks

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
});

gulp.task('clean', () => {
    return gulp.src(dist.root, {read: false})
        .pipe(clean());
});

gulp.task('build', ['sass', 'copy']);

gulp.task('default', ['build', 'webserver', 'watch']);
