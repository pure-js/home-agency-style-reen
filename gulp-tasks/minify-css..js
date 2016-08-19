module.exports = function (gulp, plugins) {
  return function () {
    gulp.src(paths.stylus)
      .pipe($.plumber())
      .pipe($.stylus({
        'include css': true
      }))
      .pipe($.cssnano())
      .pipe(gulp.dest(paths.dist + 'css'));
  };
};
