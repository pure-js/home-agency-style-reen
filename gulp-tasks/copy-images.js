module.exports = function (gulp, plugins, paths) {
  return function () {
    gulp.src(paths.images)
      .pipe(gulp.dest(paths.build + 'img'));
  };
};
