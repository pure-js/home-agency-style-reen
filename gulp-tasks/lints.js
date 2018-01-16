module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.dev + 'css/*.css')
    .pipe(plugins.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
