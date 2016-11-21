module.exports = (gulp, plugins, paths, dest) => () =>
  gulp.src(paths.images)
    .pipe(gulp.dest(dest + 'img'))
