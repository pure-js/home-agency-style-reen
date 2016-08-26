module.exports = (gulp, plugins, paths) =>
  function () {
    gulp.src(paths.pug)
      .pipe(plugins.plumber())
      .pipe(plugins.pug({
        pretty: true
      }))
      .pipe(gulp.dest(paths.build));
  };
