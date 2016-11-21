module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.stylus)
    .pipe(plugins.stylus({
      'include css': true
    }))
    .pipe(plugins.cssnano())
    .pipe(gulp.dest(paths.dist + 'css'))
