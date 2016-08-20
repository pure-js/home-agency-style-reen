module.exports = function (gulp, plugins, paths) {
  return function () {
    gulp.src(paths.build + 'css/*.css')
    pipe(plugins.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
  };
};
