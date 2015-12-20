var gulp = require('gulp'),
  fs = require('fs'),
  replace = require('gulp-replace'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  plumber = require('gulp-plumber'),
  htmlmin = require('gulp-htmlmin'),
  minifyCss = require('gulp-minify-css'),
  ghPages = require('gulp-gh-pages');

var paths = {
  jade: 'pages/*.jade',
  jadeWatch: [
    'blocks/**/*.jade',
    'pages/*.jade'
  ],
  stylus: [
    'stylesheets/main.styl',
    'stylesheets/above-the-top.styl'
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

// Get one .styl file and render
gulp.task('css', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest(paths.build + 'css/'));
});

gulp.task('html', function() {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('minify-html', function() {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade())
    // Css from file to inline
    .pipe(replace(/<link href="a.css" rel="stylesheet">/, function(s) {
      var style = fs.readFileSync('dist/css/above-the-top.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy', ['copy-images']);

gulp.task('copy-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + 'img/'));
});

gulp.task('copy-to-dist', ['copy-images-to-dist']);

gulp.task('copy-images-to-dist', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + 'img/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, ['css']);
  gulp.watch(paths.jadeWatch, ['html']);
});

gulp.task('deploy', ['dist'], function() {
  return gulp.src(paths.dist + '**/*')
    .pipe(ghPages());
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['html', 'css', 'watch', 'copy']);
gulp.task('dist', ['minify-html', 'minify-css', 'copy-to-dist']);
gulp.task('default', ['build']);
