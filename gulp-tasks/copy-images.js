module.exports = (gulp, plugins, paths, destination = paths.dev) => () =>
  gulp.src(paths.images)
    .pipe(gulp.dest(destination + 'img'))
