module.exports = function (gulp, plugins) {
  return function () {
    gulp.src(paths.pug)
      .pipe($.plumber())
      .pipe($.pug({
        pretty: true
      }))
      .pipe(gulp.dest(paths.build));
  };
};
