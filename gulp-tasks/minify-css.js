module.exports = function (gulp, plugins, paths) {
  return function () {
    gulp.src(paths.stylus)
      .pipe(plugins.plumber())
      .pipe(plugins.stylus({
        'include css': true
      }))
      .pipe(plugins.cssnano())
      .pipe(gulp.dest(paths.dist + 'css'));
  };
};
