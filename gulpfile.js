const gulp = require('gulp'),
  merge = require('merge-stream'),
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
  dev: '.tmp/',
  dist: 'dist/'
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
gulp.task('css-min', getTask('css-min'));
gulp.task('html-min', getTask('html-min'));

// Rerun the task when a file changes
function watch() {
  gulp.watch(paths.stylusWatch, gulp.series('css'));
  gulp.watch(paths.pugWatch, gulp.series('html'));
}

gulp.task('copy-images', getTaskCustomDist('copy-images', paths.dev));
gulp.task('copy', gulp.series('copy-images'));

gulp.task('lint-css', function lintCssTask() {
  return gulp.src(paths.dev + 'css/*.css')
    .pipe(plugins.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

exports.watch = watch;

gulp.task('test', gulp.series('lint-css'));

gulp.task('sprite', getTask('sprite'));

gulp.task('copy-images-to-dist', getTaskCustomDist('copy-images', paths.dist));
gulp.task('copy-to-dist', gulp.series('copy-images-to-dist'));

gulp.task('dist', gulp.series('html-min', 'css-min', 'copy-to-dist', 'sprite'));

gulp.task('deploy', gulp.series('dist', () =>
  gulp.src(paths.dist + '**/*')
    .pipe(plugins.ghPages())
));

const dev = gulp.series('html', 'css', 'copy', watch);

// The default task (called when you run `gulp` from cli)
gulp.task('default', dev);
