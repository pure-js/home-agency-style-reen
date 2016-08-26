module.exports = (gulp, plugins, paths, merge) =>
  function () {
    // Generate our spritesheet
    let spriteData = gulp.src('img/previews/*.jpg')
      .pipe(plugins.spritesmith({
        imgName: '../img/sprites/sprite.png',
        cssName: 'sprite.styl'
      }));

    // Pipe image stream through image optimizer and onto disk
    let imgStream = spriteData.img
      // DEV: We must buffer our stream into a Buffer for `imagemin`
      // .pipe(buffer())
      // .pipe(imagemin())
      .pipe(gulp.dest('./sprites'));

    // Pipe CSS stream through CSS optimizer and onto disk
    let cssStream = spriteData.css
      // .pipe(csso())
      .pipe(gulp.dest('src/stylesheets'));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
  };
