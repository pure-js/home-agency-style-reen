const gulp = require('gulp'),
  fs = require('fs'),
  merge = require('merge-stream'),
  plugins = require('gulp-load-plugins')();

const paths = {
  pug: 'pages/*.pug',
  pugWatch: [
    'blocks/**/*.pug',
    'pages/*.pug'
  ],
  stylus: [
    'stylesheets/main.styl',
    'stylesheets/above-the-fold.styl'
  ],
  stylusWatch: [
    'blocks/**/*.styl',
    'stylesheets/main.styl'
  ],
  images: 'img/**/*.{png,jpg}',
  css: 'bower_components/normalize.css/normalize.css',
  build: 'build/',
  dist: 'dist/'
};

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, paths);
}

// Get one .styl file and render
gulp.task('css', getTask('css'));
gulp.task('html', getTask('html'));
gulp.task('minify-css', getTask('minify-css'));
gulp.task('minify-html', ['minify-css'], getTask('minify-html'));

gulp.task('copy', ['copy-images']);

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + 'img'));
});

gulp.task('copy-to-dist', ['copy-images-to-dist']);

gulp.task('copy-images-to-dist', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('lint-css', ['build'], function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src(paths.build + 'css/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});


gulp.task('test', ['csslint']);

// gulp.task('sprite', getTask('sprite'));

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, ['css']);
  gulp.watch(paths.pugWatch, ['html']);
});

gulp.task('deploy', ['dist'], function() {
  return gulp.src(paths.dist + '**/*')
    .pipe(ghPages());
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['html', 'css', 'watch', 'copy']);
gulp.task('dist', ['minify-html', 'minify-css', 'copy-to-dist', 'sprite']);
gulp.task('default', ['build']);
