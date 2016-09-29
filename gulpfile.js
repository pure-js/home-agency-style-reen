const gulp = require('gulp'),
  fs = require('fs'),
  merge = require('merge-stream'),
  kss = require('kss'),
  plugins = require('gulp-load-plugins')();

const paths = {
  pug: 'src/pages/*.pug',
  pugWatch: [
    'src/blocks/**/*.pug',
    'src/pages/*.pug'
  ],
  stylus: [
    'src/stylesheets/main.styl',
    'src/stylesheets/above-the-fold.styl'
  ],
  stylusWatch: [
    'src/blocks/**/*.styl',
    'src/stylesheets/main.styl'
  ],
  images: 'img/**/*.{png,jpg}',
  css: 'bower_components/normalize.css/normalize.css',
  build: 'build/',
  dist: 'dist/',
  styleGuide: 'styleguide'
};

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, paths, merge);
}

function getTaskCustomDist(task, destination) {
  return require('./gulp-tasks/' + task)(gulp, plugins, paths, destination);
}

// Get one .styl file and render
gulp.task('css', getTask('css'));
gulp.task('html', getTask('html'));
gulp.task('minify-css', getTask('minify-css'));
gulp.task('minify-html', getTask('minify-html'));

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, gulp.series('css'));
  gulp.watch(paths.pugWatch, gulp.series('html'));
});

gulp.task('copy-images', getTaskCustomDist('copy-images', paths.build));
gulp.task('copy', gulp.series('copy-images'));

gulp.task('build', gulp.series('html', 'css', 'copy', 'watch'));

gulp.task('lint-css', gulp.series('build'), function lintCssTask() {
  return gulp
    .src(paths.build + 'css/*.css')
    .pipe(plugins.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('test', gulp.series('lint-css'));

gulp.task('sprite', getTask('sprite'));

gulp.task('copy-images-to-dist', getTaskCustomDist('copy-images', paths.dist));
gulp.task('copy-to-dist', gulp.series('copy-images-to-dist'));

gulp.task('dist', gulp.series('minify-html', 'minify-css', 'copy-to-dist', 'sprite'));

gulp.task('deploy', gulp.series('dist', function() {
  return gulp.src(paths.dist + '**/*')
    .pipe(ghPages());
}));

// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series('build'));
