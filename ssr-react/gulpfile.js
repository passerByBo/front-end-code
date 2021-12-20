var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig-back.json');
const watch = require('gulp-watch');
const entry = './src/server/*.ts';

function buildConfig() {
    return gulp.src(entry)
        .pipe(tsProject())
        .pipe(gulp.dest('dist'))
}

function buildDev() {
    return watch(entry, { ignoreInitial: false}, () => {
        gulp.src(entry)
            .pipe(tsProject())
            .pipe(gulp.dest('dist'))
    })
}

function buildProd() {
    return;
}

let build = gulp.series(buildDev)
if (process.env.NODE_ENV === 'production') {
    build = gulp.series(buildConfig)
}

exports.default = build;