const gulp = require('gulp'),
    del = require('del'),
    // concat = require("gulp-concat"),
    // sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // inject = require("gulp-inject"),
    // es = require('event-stream'),
    exract = require('gulp-export-html'),
    rollup = require('gulp-better-rollup'),
    babel = require('rollup-plugin-babel'),
    browserSync = require('browser-sync'),
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


function style() {
    return gulp.src(PATH.styles)
    // .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: [
        "last 2 versions",
        "> 1%",
        "maintained node versions",
        "not dead"
      ]
    }))
    // .pipe(sourcemaps.write('.'))
    .pipe(exract({
        prefix: '',
        suffix: '-style',
        concat: 'styles.js'
    }))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());

    // .pipe(concat('all.css'))
    // .pipe(gulp.dest('dist/'));

}

function templates(){
    return gulp.src('src/**/*.html')
    .pipe(exract({
        prefix: '',
        suffix: '-template',
        concat: 'templates.js'
    }))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());
}

function rollImport() {
    return gulp.src('./src/index.js')
            .pipe(rollup({ plugins: [ resolve(), babel()]}, 'umd'))
            
            // .pipe(rollup({ plugins: [resolve(), htmlRoll()] }, 'umd'))
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.stream());
}

function copyFiles(){
    return gulp.src('./index.html')
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.stream());

}

// Watch files
function watchFiles() {
  gulp.watch("./src/**/*.scss", style);
  gulp.watch("./src/**/*.html", templates);
  gulp.watch("./src/**/*.js", rollImport);
  gulp.watch("./index.html", copyFiles);
  
}


function sync(done) {
  browserSync.init({
    server: {
      // watch: true,
      baseDir: "dist/",
      index:"index.html"
    },
    port: 3000
  });
  done();
}

exports.roll = rollImport;
exports.clean = clean;
exports.style = style;
exports.copy = copyFiles;
exports.templates = templates;
exports.watch = gulp.parallel(watchFiles, sync);

exports.default = gulp.series(clean, vendor, style, templates, copyFiles, rollImport);
