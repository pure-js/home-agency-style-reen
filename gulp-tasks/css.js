module.exports = function (gulp, plugins) {
  return function () {
    gulp.src(paths.stylus)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.stylus({
        'include css': true
      }))
      .pipe($.sourcemaps.write(''))
      .pipe(gulp.dest(paths.build + 'css'));
  };
};
