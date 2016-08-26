module.exports = (gulp, plugins, paths) =>
  function () {
    gulp.src(paths.build + 'css/*.css')
    pipe(plugins.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
  };
