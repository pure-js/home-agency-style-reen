const gulp = require('gulp'),
  fs = require('fs'),
  merge = require('merge-stream'),
  plugins = require('gulp-load-plugins')();

const paths = {
  pug: 'pages/*.pug',
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
gulp.task('minify-css', getTask('minify-css'));
gulp.task('minify-html', ['minify-css'], getTask('minify-html'));

gulp.task('lint-css', ['build'], function lintCssTask() {
  return gulp
    .src(paths.build + 'css/*.css')
    .pipe(plugins.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('test', ['csslint']);

gulp.task('sprite', getTask('sprite'));

gulp.task('copy', ['copy-images']);
gulp.task('copy-images', getTaskCustomDist('copy-images', paths.build));
gulp.task('copy-to-dist', ['copy-images-to-dist']);
gulp.task('copy-images-to-dist', getTaskCustomDist('copy-images', paths.dist));

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, ['css']);
  gulp.watch(paths.pugWatch, ['html']);
});

gulp.task('deploy', ['dist'], () =>
  gulp.src(paths.dist + '**/*')
    .pipe(ghPages());
);

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['html', 'css', 'watch', 'copy']);
gulp.task('dist', ['minify-html', 'minify-css', 'copy-to-dist', 'sprite']);
gulp.task('default', ['build']);
