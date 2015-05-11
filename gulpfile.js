var gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus');

var paths = {
  jade: 'index.jade',
  jadeWatch: [
    'blocks/**/*.jade',
    'index.jade'
  ],
  stylus: 'stylesheets/main.styl',
  stylusWatch: [
    'blocks/**/*.styl',
    'stylesheets/main.styl'
  ],
  images: 'img/**/*.{png,jpg}',
  build: 'build'
};

// Get one .styl file and render
gulp.task('css', function() {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest(paths.build + '/css'));
});

gulp.task('html', function() {
  gulp.src(paths.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('copy', ['copy-images']);

gulp.task('copy-images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + '/img'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, ['css']);
  gulp.watch(paths.jadeWatch, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['html', 'css', 'watch', 'copy']);
