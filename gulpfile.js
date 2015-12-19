var gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  plumber = require('gulp-plumber'),
  ghPages = require('gulp-gh-pages');

var paths = {
  jade: 'pages/*.jade',
  jadeWatch: [
    'blocks/**/*.jade',
    'pages/*.jade'
  ],
  stylus: 'stylesheets/main.styl',
  stylusWatch: [
    'blocks/**/*.styl',
    'stylesheets/main.styl'
  ],
  images: 'img/**/*.{png,jpg}',
  css: 'bower_components/normalize.css/normalize.css',
  build: 'build'
};

// Get one .styl file and render
gulp.task('css', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest(paths.build + '/css'));
});

gulp.task('html', function() {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('copy', ['copy-images', 'copy-css']);

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + '/img'))
});

gulp.task('copy-css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.build + '/css'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, ['css']);
  gulp.watch(paths.jadeWatch, ['html']);
});

gulp.task('deploy', function() {
  return gulp.src(paths.build + '/**/*')
    .pipe(ghPages());
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['html', 'css', 'watch', 'copy']);
