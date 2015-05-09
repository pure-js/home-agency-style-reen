var gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus');

var paths = {
  jade: 'index.jade',
  stylus: 'stylesheets/main.styl'
};

// Get one .styl file and render
gulp.task('css', function() {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', function() {
  gulp.src(paths.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['css']);
  gulp.watch(paths.jade, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['html', 'css', 'watch']);
