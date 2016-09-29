module.exports = (gulp, plugins, paths) =>
  function (done) {
    gulp.src(paths.images)
      .pipe(gulp.dest(paths.build + 'img'));
    done();
  };
