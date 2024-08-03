const gulp = require('gulp'),
  del = require('del'),
  plugins = require('gulp-load-plugins')();

const paths = {
  pug: 'src/pages/*.pug',
  pugWatch: ['src/blocks/**/*.pug', 'src/pages/*.pug'],
  stylus: ['src/stylesheets/main.styl', 'src/stylesheets/above-the-fold.styl'],
  stylusWatch: ['src/blocks/**/*.styl', 'src/stylesheets/main.styl'],
  images: 'img/**/*.{png,jpg}',
  css: 'bower_components/normalize.css/normalize.css',
  dev: '.tmp/',
  dist: 'dist/',
};

function getTask(task, dest = paths.dev) {
  return require('./gulp-tasks/' + task)(gulp, plugins, paths, dest);
}

// Get one .styl file and render
gulp.task('css', getTask('css'));
gulp.task('html', getTask('html'));
gulp.task('css-min', getTask('css-min'));
gulp.task('html-min', getTask('html-min'));

const clean = () => del(['.tmp', 'dist', '.publish']);

gulp.task('copy-images', getTask('copy-images'));
gulp.task('copy', gulp.series('copy-images'));

// Rerun the task when a file changes
function watch() {
  gulp.watch(paths.stylusWatch, gulp.series('css'));
  gulp.watch(paths.pugWatch, gulp.series('html'));
}

const sprite = require('./gulp-tasks/sprite');

gulp.task('copy-images-to-dist', getTask('copy-images', paths.dist));
gulp.task('copy-to-dist', gulp.parallel('copy-images-to-dist'));

const build = gulp.series(
  'css-min',
  gulp.parallel('html-min', 'copy-to-dist', sprite)
);

const dev = gulp.parallel('html', 'css', 'copy', watch);

exports.watch = watch;
exports.clean = clean;
exports.sprite = sprite;
exports.dev = dev;
exports.build = build;
// The default task (called when you run `gulp` from cli)
exports.default = dev;
