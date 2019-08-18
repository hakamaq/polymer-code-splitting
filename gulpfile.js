const gulp = require('gulp'),
    del = require('del'),
    concat = require("gulp-concat"),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    inject = require("gulp-inject"),
    es = require('event-stream'),
    saveFile = require('gulp-savefile');
    rollup = require('gulp-better-rollup'),
    htmlRoll = require('gulp-export-html'),
    babel = require('rollup-plugin-babel'),
    browserSync = require('browser-sync'),
    filesize = require('rollup-plugin-filesize'),
    resolve = require('rollup-plugin-node-resolve');

const PATH = {
    styles: './src/components/**/*.scss',
    htmls: ['./src/components/**/*.html'],
    vendor: [
        './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
        // './node_modules/@polymer/iron-demo-helpers/demo-pages-shared-styles.js',
        // './node_modules/@polymer/iron-demo-helpers/demo-snippet.js'
    ],
}

function clean() {
    return del(['./dist', './src/template.js']);
}

function vendor() {
  return gulp.src(PATH.vendor)
    .pipe(gulp.dest('./dist/assets/'));
}


function style(done) {
  const style = gulp.src(PATH.styles)
    // return gulp.src(PATH.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: [
        "last 2 versions",
        "> 1%",
        "maintained node versions",
        "not dead"
      ]
    }))
    .pipe(sourcemaps.write('.'))
    // .pipe(concat('all.css'))
    // .pipe(gulp.dest('dist/'));

  return gulp.src(PATH.htmls)
    .pipe(inject(es.merge(style)))
    .pipe(saveFile());
}

function templates(){
    return gulp.src('src/**/*.html')
    // .pipe(htmlToJs({concat: 'template.js'}))
    .pipe(htmlToJs({
        prefix: '',
        suffix: '-template',
        concat: 'template.js'
    }))
    // .pipe(concat(''))
    .pipe(gulp.dest('src/'));
}

function rollImport() {
    // return gulp.src('./src/**/*.js')
            // .pipe(babel({
            //         presets: ['@babel/env']
            //     }))
            // .pipe(concat('index.js'))
            // .pipe(uglify())
            // .pipe(gulp.dest('dist/'));

    return gulp.src('./src/index.js')
            .pipe(rollup({ plugins: [ resolve(), babel(), htmlRoll(), filesize()] }, 'umd'))
            
            // .pipe(rollup({ plugins: [resolve(), htmlRoll()] }, 'umd'))
            .pipe(gulp.dest('dist/'));
}

function copyFiles(){
    return gulp.src('./index.html')
            .pipe(gulp.dest('dist/'));
}

function sync(done) {
    // gulp.src('./dist/index.js')
    //     .pipe(rollup({ plugins: [ browserSync({server: 'dist'})]}, 'cjs'))
  browserSync.init({
    server: {
      baseDir: "dist/",
      index:"index.html"
    },
    port: 3000
  });
//   gulp.watch(["./src/**/*.js", './src/**/*.scss', './src/**/*.html']);
  done();
}

exports.roll = rollImport;
exports.clean = clean;
exports.style = style;
exports.copy = copyFiles;
exports.templates = templates;
exports.sync = sync;

exports.default = gulp.series(clean, vendor, style, templates, copyFiles, rollImport);