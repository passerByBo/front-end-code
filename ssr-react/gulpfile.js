var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig-back.json');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const entry = './src/server/*.ts';

function buildConfig() {
    return gulp.src(entry)
        //gulp-typescript会报错koa-router.default
        // .pipe(tsProject())
        .pipe(babel({
            babelrc: false,
            presets: ["@babel/preset-typescript"],
            plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                '@babel/plugin-transform-modules-commonjs'
            ]
        }))
        .pipe(gulp.dest('dist'))
}

function buildDev() {
    return watch(entry, { ignoreInitial: false}, () => {
        gulp.src(entry)
            // .pipe(tsProject())
            .pipe(babel({
                babelrc: false,
                presets: ["@babel/preset-typescript"],
                plugins: [
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    '@babel/plugin-transform-modules-commonjs'
                ]
            }))
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