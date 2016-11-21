module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.dev + 'img'))
