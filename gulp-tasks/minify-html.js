module.exports = (gulp, plugins, paths) =>
  function (done) {
    const fs = require('fs');
    gulp.src(paths.pug)
      .pipe(plugins.plumber())
      .pipe(plugins.pug())
      // Css from file to inline
      .pipe(plugins.replace(/<link href="css\/above-the-fold.css" rel="stylesheet">/, function(s) {
        let style = fs.readFileSync('dist/css/above-the-fold.css', 'utf8');
        return '<style>\n' + style + '\n</style>';
      }))
      .pipe(plugins.htmlmin({
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }))
      .pipe(gulp.dest(paths.dist));
    done();
  };
