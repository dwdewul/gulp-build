const gulp = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const maps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

gulp.task('clean', () => {
  return del(['css', 'dist']);
});

// HTML Build Tasks
gulp.task('minify-html', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// JavaScript Build Tasks
gulp.task('scripts', ['minify-js']);

gulp.task('minify-js', ['concat'], () => {
  return gulp.src('dist/scripts/app.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('concat', () => {
  return gulp.src('js/**/*.js')
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});


// CSS Build Tasks
gulp.task('styles', ['minify-css'], () => {
  return del('dist/styles/global.css');
});

gulp.task('minify-css', ['compile-css'], () => {
  return gulp.src('dist/styles/*.css')
    .pipe(maps.init())
    .pipe(cleanCSS())
    .pipe(maps.write())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('compile-css',() => {
  return gulp.src('sass/global.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'));
});

// Image Build Task
gulp.task('images', () => {
  return;
});

// Master Build Task
gulp.task('build', () => {
  return;
});

// Default Build Task
gulp.task('default', () => {

});