module.exports = (gulp, plugins, paths) =>
  function () {
    gulp.src(paths.images)
      .pipe(gulp.dest(paths.build + 'img'));
  };
